import { useState, useEffect } from 'react';
import {
  BiDotsVerticalRounded,
  // BiSolidUserCircle
} from "react-icons/bi";
import { useParams, useNavigate } from 'react-router-dom';
import getAccessToken from '../../common/utils/getToken.js';
import CommunityBoard1 from '../../common/image/CommunityBoard1.webp';

import {
  CommunityBoardContainer,
  // CommunityCommentBox,
  // CommunityCommentDelete,
  // CommunityCommentCorrection,
  // Line,
  // CommunityH,
  PostBox,
  PostTitleBox,
  PostTitle,
  // ComuCommentpost,
  PostBoard,
  PostCorrection,
  PostDelete,
  MenuIcon1,
  // MenuIcon2,
  PostUserBox,
  // UserPicture,
  ComuComment,
  ComuCommentWriting,
  BackgroundImageContainer
} from './CommunityBoard.styled.js';
import Comment from '../../components/Comment/Comment.js';
import axios from 'axios';
import WriteComment from '../../components/WriteComment/WriteComment.js';

const URI = process.env.REACT_APP_API_URL;


function CommunityBoard() {

  // const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const toggleCommentMenu = () => {
  //   setIsCommentMenuOpen(!isCommentMenuOpen);
  // };
  // const [title, editTitle] = useState('');
  // const [content, editContent] = useState('');
  // console.log(editContent, editTitle)
  const handleContentChange = (editContent) => {
    editContent(editContent);

  };
  console.log(handleContentChange)



  const togglePostMenu = () => {
    setIsPostMenuOpen(!isPostMenuOpen);
  };


  const param = useParams();
  const id = param.boardId;

  const [boardData, setBoardData] = useState([])

  // API에 요청을 보내는 함수를 정의합니다.
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URI}/board/${id}`);
      // 여기에서 응답 데이터를 처리합니다.
      console.log(response.data);
      setBoardData(response.data);

    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };
  //삭제
  const deleteHandler = async () => {
    let access_token = getAccessToken();

    try {
      const response = await axios.delete(`${URI}/board/${id}/delete`,
        {
          headers: {
            Authorization: access_token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // 여기에서 응답 데이터를 처리합니다.
      console.log(response.data);
      navigate('/CommunityList')

    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  }
  //수정
  const editHandler = async () => {

    navigate(`/EditPage/${id}`)

  }


  // };
  // 작성자인지 확인하고 수정삭제 안뜨게
  // const isAuthor = () => {

  //   return username === currentUser.username;
  // };
  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  useEffect(() => {
    console.log(deleteComment, editComment);
    // 컴포넌트가 마운트될 때 또는 boardId가 변경될 때 fetchData 함수를 호출합니다.
    fetchData();
    // 댓글 목록을 불러오는 함수를 호출합니다.
    fetchComments();
  }, [id]);
  return (
    <CommunityBoardContainer>
      <BackgroundImageContainer backgroundImage={`url(${CommunityBoard1})`}>
        Board
      </BackgroundImageContainer>
      <PostBox>
        <PostTitleBox>
          <PostTitle>
            {boardData.title}
          </PostTitle>


          <MenuIcon1 onClick={togglePostMenu} onKeyDown={togglePostMenu} role="button" tabIndex={0}>
            <BiDotsVerticalRounded />
            {isPostMenuOpen && (
              <>
                <PostCorrection>Edit</PostCorrection>
                <PostDelete>Delete</PostDelete>
              </>
            )}
          </MenuIcon1>

        </PostTitleBox>
        <PostUserBox>
          {/* 프로필이미지 */}
          {/* <UserPicture>
            {profilePicture ? <img src={profilePicture} alt="프로필" /> : <BiSolidUserCircle />}
          </UserPicture> */}
          <div>
            {boardData.author
              && <span>닉네임: {boardData.author}</span>}
            <span>작성일: {boardData.modifiedAt}</span>
            <span>조회수: {boardData.view}</span>

          </div>
        </PostUserBox>
        <PostBoard>
          {/* 이 곳에 게시물 컴포넌트 렌더링 */}
          {/* 예시:
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    */}

          <div>{htmlToText(boardData.content)}</div>
        </PostBoard>
      </PostBox>


      {/* Write Comment */}
      <ComuCommentWriting>
        <WriteComment
          boardId={id}
          fetchComment={fetchComments}
          fetchBoard={fetchData} />
      </ComuCommentWriting>

      {/* Comment List */}
      {comments.length > 0 &&
        <ComuComment>
          {comments.map((comment) => (
            <Comment
              key={comment.commentId}
              boardId={id}
              comment={comment}
              fetchComment={fetchComments}
              fetchBoard={fetchData} />
          ))}
        </ComuComment >
      }
    </CommunityBoardContainer >
  );

}

export default CommunityBoard;