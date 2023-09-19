import { useState, useEffect } from 'react';
import {
  BiDotsVerticalRounded,
} from "react-icons/bi";
import { useParams, useNavigate } from 'react-router-dom';
import getAccessToken from '../../common/utils/getToken.js';
import CommunityBoard1 from '../../common/image/CommunityBoard1.webp';
import {
  CommunityBoardContainer,
  PostBox,
  PostTitleBox,
  PostTitle,
  PostBoard,
  PostCorrection,
  PostDelete,
  MenuIcon1,
  PostUserBox,
  ComuComment,
  ComuCommentWriting,
  BackgroundImageContainer
} from './CommunityBoard.styled.js';
import Comment from '../../components/Comment/Comment.js';
import axios from 'axios';
import WriteComment from '../../components/WriteComment/WriteComment.js';

const URI = process.env.REACT_APP_API_URL;

function CommunityBoard() {
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleContentChange = (editContent) => {
        editContent(editContent);
    };

    const togglePostMenu = () => {
        setIsPostMenuOpen(!isPostMenuOpen);
    };

    const param = useParams();
    const id = param.boardId;
    const [boardData, setBoardData] = useState([]);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(`${URI}/board/${id}`);
            setBoardData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteHandler = async () => {
        let access_token = getAccessToken();
        try {
            const response = await axios.delete(`${URI}/board/${id}/delete`, {
                headers: {
                    Authorization: access_token,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            navigate('/CommunityList');
        } catch (error) {
            console.error(error);
        }
    };

    const editHandler = () => {
        navigate(`/EditPage/${id}`);
    };

    const htmlToText = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    useEffect(() => {
        fetchData();
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
                    <div>
                        {boardData.author && <span>닉네임: {boardData.author}</span>}
                        <span>작성일: {boardData.modifiedAt}</span>
                        <span>조회수: {boardData.view}</span>
                    </div>
                </PostUserBox>
                <PostBoard>
                    <div>{htmlToText(boardData.content)}</div>
                </PostBoard>
            </PostBox>

            <ComuCommentWriting>
                <WriteComment
                    boardId={id}
                    fetchComment={fetchComments}
                    fetchBoard={fetchData}
                />
            </ComuCommentWriting>

            {comments.length > 0 && (
                <ComuComment>
                    {comments.map((comment) => (
                        <Comment
                            key={comment.commentId}
                            boardId={id}
                            comment={comment}
                            fetchComment={fetchComments}
                            fetchBoard={fetchData}
                        />
                    ))}
                </ComuComment>
            )}
        </CommunityBoardContainer>
    );
}

export default CommunityBoard;
