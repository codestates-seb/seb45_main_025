import { useState, useEffect } from 'react';
import {
  BiDotsVerticalRounded,
  // BiSolidUserCircle
} from "react-icons/bi";
import { useParams } from 'react-router-dom';
import getAccessToken from '../../common/utils/getToken.js';

import {
  CommunityBoardContainer,
  // CommunityCommentBox,
  CommunityCommentDelete,
  CommunityCommentCorrection,
  Line,
  CommunityH,
  PostBox,
  PostTitleBox,
  PostTitle,
  ComuCommentpost,
  PostBoard,
  PostCorrection,
  PostDelete,
  MenuIcon1,
  MenuIcon2,
  PostUserBox,
  // UserPicture,
  ComuComment,
  ComuCommentWriting
} from './CommunityBoard.styled.js';
import axios from 'axios';
const URI = process.env.REACT_APP_API_URL;


function CommunityBoard() {

  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

  const toggleCommentMenu = () => {
    setIsCommentMenuOpen(!isCommentMenuOpen);
  };

  const togglePostMenu = () => {
    setIsPostMenuOpen(!isPostMenuOpen);
  };


  const param = useParams();
  const id = param.boardId;
  console.log(id)
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

  const [isEdit, setisEdit] = useState(false)


  //댓글
  const [newcomment, setnewcomment] = useState("");
  const handleCommentChange = (e) => {
    setnewcomment(e.target.value);
  };

  // 댓글 목록을 관리할 상태 추가
  const [comments, setComments] = useState([]);

  // 댓글 목록을 불러오는 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${URI}/board/${id}/comment`);
      // 서버로부터 댓글 목록을 받아온 후 상태를 업데이트
      setComments(response.data);
      console.log(123, response.data)
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  // 댓글 작성 함수
  const submitComment = async () => {
    let access_token = getAccessToken();
    try {
      // 서버로 댓글을 보내고, 성공 시 댓글 목록을 업데이트
      const response = await axios.post(`${URI}/board/${id}/comment`, {
        "content": newcomment
      }, { headers: { Authorization: access_token } });

      setComments([...comments, response.data]);
      // 댓글 입력 상태 초기화
      setnewcomment("");
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };
  const [editStates, setEditStates] = useState([]);
  // 댓글 수정 함수
  const editComment = async (commentId, updatedContent) => {
    let access_token = getAccessToken();
    try {
      // 서버로 수정된 댓글을 보내고, 성공 시 댓글 목록을 업데이트
      const response = await axios.patch(`${URI}/board/${id}/comment/${commentId}`, {
        "content": updatedContent // 수정된 내용을 사용
      }, { headers: { Authorization: access_token } });
      console.log(updatedContent);
      // 댓글 목록을 업데이트
      const updatedComments = comments.map((c) => (c.commentId === commentId ? response.data : c));
      setComments(updatedComments);

      // 해당 댓글의 편집 상태를 false로 설정하여 편집 모드를 종료합니다.
      const updatedEditStates = editStates.map((state, index) => (index === commentId ? false : state));
      setEditStates(updatedEditStates);
      // 수정된 댓글을 저장한 후 isEdit를 false로 설정합니다
      setisEdit(false);
    } catch (error) {
      //에러 처리
      console.error(error);
    }
  };

  // 댓글 삭제 함수
  const deleteComment = async (commentId) => {
    let access_token = getAccessToken();
    try {
      // 서버로 댓글 삭제 요청을 보내고, 성공 시 댓글 목록을 업데이트
      await axios.delete(`${URI}/board/${id}/comment/${commentId}`, { headers: { Authorization: access_token } });
      // 댓글 목록에서 삭제된 댓글 제거
      // const updatedComments = comments.filter((c) => c.id !== commentId);
      // setComments(updatedComments);
      fetchComments();
    } catch (error) {
      // 에러 처리
      console.error(error);
    }

  };
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
      <Line />
      <CommunityH>Community</CommunityH>
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
      {/* <CommunityCommentBox> */}
      <ComuCommentWriting>
        {/* <UserPicture>
          {profilePicture ? (
            <img src={profilePicture} alt="프로필" />
          ) : (
            <BiSolidUserCircle />
          )}
        </UserPicture> */}
        <div>{boardData.author && <span>{boardData.author}:</span>}</div>
        <form>
          <div style={{ position: 'relative' }}>
            <textarea
              placeholder="Enter your comment..."
              value={newcomment}
              onChange={handleCommentChange}
              style={{
                width: '500px',
                height: '70px',
                resize: 'none'
              }}
            />
            <button
              onClick={submitComment}
              type="submit"
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                width: `60px`,
                height: `25px`,
                fontSize: `10px`,
                marginBottom: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Post
            </button>
          </div>
        </form>
      </ComuCommentWriting>

      <ComuComment>
        {/* <UserPicture>
          {profilePicture ? (
            <img src={profilePicture} alt="프로필" />
          ) : (
            <BiSolidUserCircle />
          )}
        </UserPicture> */}


        {comments.length &&
          comments.map((comment) => (
            <ComuCommentpost key={comment.commentId}>
              <div>{comment.name && <span>{comment.name}:</span>}</div>

              {isEdit ? (
                <input
                  placeholder={comment.content}
                  value={newcomment} // 입력 필드의 값을 newcomment 상태와 연결합니다.
                  onChange={(e) => setnewcomment(e.target.value)} // 입력이 변경될 때 newcomment를 업데이트합니다.
                />
              ) : (
                <div>{comment.content}</div>
              )}
              <MenuIcon2
                onClick={toggleCommentMenu}
                onKeyDown={toggleCommentMenu}
                role="button"
                tabIndex={0}
              >
                <BiDotsVerticalRounded />
                {/* {isCommentMenuOpen && ( */}
                <>
                  {isEdit ?
                    <CommunityCommentCorrection onClick={() => editComment(comment.commentId, newcomment)}>Save</CommunityCommentCorrection> :
                    <CommunityCommentCorrection onClick={() => setisEdit(true)}>Edit</CommunityCommentCorrection>}
                  {/* <CommunityCommentCorrection onClick={() => editComment(comment.commentId, newcomment)}>Edit</CommunityCommentCorrection> */}
                  <CommunityCommentDelete onClick={() => deleteComment(comment.commentId)}>Delete</CommunityCommentDelete>
                </>
                {/* )} */}
              </MenuIcon2>
              <span span style={{ marginTop: '40px' }}>
                Posting date: {boardData.createdAt}
              </span>
            </ComuCommentpost>

          ))
        }


      </ComuComment >
      {/* </CommunityCommentBox> */}
    </CommunityBoardContainer >
  );
}

export default CommunityBoard;

