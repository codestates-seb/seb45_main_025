import { useState , useEffect } from 'react';
import { BiDotsVerticalRounded , BiSolidUser } from "react-icons/bi";


import {
    CommunityBoardContainer,
    CommunityCommentBox,
    CommunityCommentDelete,
    CommunityCommentCorrection,

    Line,
    CommunityH,
    PostBox,
    PostTitleBox,
    PostTitle,
    PostBoard,
    PostCorrection,
    PostDelete,
    MenuIcon1,
    MenuIcon2,
    PostUserBox,
    UserPicture,
    ComuComment,
    ComuCommentWriting

} from './CommunityBoard.styled.js';
import axios from 'axios';

function CommunityBoard({ title, content, boardId, profilePicture, postDate, viewCount, username }) {
    const URI = process.env.REACT_APP_API_URL;

    const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

    const toggleCommentMenu = () => {
        setIsCommentMenuOpen(!isCommentMenuOpen);
    };

    const togglePostMenu = () => {
        setIsPostMenuOpen(!isPostMenuOpen);
    };

    // API에 요청을 보내는 함수를 정의합니다.
    const fetchData = async () => {
        try {
            const response = await axios.get(`${URI}/board/boardId`);
            // 여기에서 응답 데이터를 처리합니다.
            console.log(response.data);
        } catch (error) {
            // 에러 처리
            console.error(error);
        }
    };

    //댓글
    const [comment, setComment] = useState("");
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // 댓글 목록을 관리할 상태 추가
    const [comments, setComments] = useState([]);

    // 댓글 목록을 불러오는 함수
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${URI}board/{board-id}/comment`);
            // 서버로부터 댓글 목록을 받아온 후 상태를 업데이트
            setComments(response.data);
        } catch (error) {
            // 에러 처리
            console.error(error);
        }
    };

    // 댓글 작성 함수
    const submitComment = async () => {
        try {
            // 서버로 댓글을 보내고, 성공 시 댓글 목록을 업데이트
            const response = await axios.post(`${URI}/board/{board-id}/comment`, {
                "content": content
             });
            setComments([...comments, response.data]);
            // 댓글 입력 상태 초기화
            setComment("");
        } catch (error) {
            // 에러 처리
            console.error(error);
        }
    };

    // 댓글 수정 함수
    const editComment = async (commentId, updatedContent) => {
        try {
            // 서버로 수정된 댓글을 보내고, 성공 시 댓글 목록을 업데이트
            const response = await axios.patch(`${URI}/board/{board-id}/comment/{comment-id}`, {
                "content": content
                 });
                 console.log(updatedContent);
            // 댓글 목록을 업데이트
            const updatedComments = comments.map((c) => (c.id === commentId ? response.data : c));
            setComments(updatedComments);
        } catch (error) {
            // 에러 처리
            console.error(error);
        }
    };

    // 댓글 삭제 함수
    const deleteComment = async (commentId) => {
        try {
            // 서버로 댓글 삭제 요청을 보내고, 성공 시 댓글 목록을 업데이트
            await axios.delete(`${URI}/board/{board-id}/comment/{comment-id}`);
            // 댓글 목록에서 삭제된 댓글 제거
            const updatedComments = comments.filter((c) => c.id !== commentId);
            setComments(updatedComments);
        } catch (error) {
            // 에러 처리
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(deleteComment, editComment);
        // 컴포넌트가 마운트될 때 또는 boardId가 변경될 때 fetchData 함수를 호출합니다.
        fetchData();
        // 댓글 목록을 불러오는 함수를 호출합니다.
        fetchComments();
    }, [boardId]);
    return (
        <CommunityBoardContainer>
            <Line />
            <CommunityH>Community</CommunityH>
            <PostBox>
                <PostTitleBox>
                    <PostTitle>
                        {title}제목위치 확인용 나중에글씨지우기
                    </PostTitle>


                    <MenuIcon1 onClick={togglePostMenu} onKeyDown={togglePostMenu} role="button" tabIndex={0}>
                        <BiDotsVerticalRounded />
                        {isPostMenuOpen && (
                            <>
                                <PostCorrection>수정</PostCorrection>
                                <PostDelete>삭제</PostDelete>
                            </>
                        )}
                    </MenuIcon1>

                </PostTitleBox>
                <PostUserBox>
                    <UserPicture>
                        {profilePicture ? <img src={profilePicture} alt="프로필" /> : <BiSolidUser />}
                    </UserPicture>
                    <div>
                        {username && <span>유저 닉네임: {username}</span>}
                        <span>게시 날짜: {postDate}</span>
                        <span>조회수: {viewCount}</span>

                    </div>
                </PostUserBox>
                <PostBoard>
                    {/* 이 곳에 게시물 컴포넌트 렌더링 */}
                    {/* 예시:
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    */}

                    <div>{content}</div>
                </PostBoard>
            </PostBox>
            <CommunityCommentBox>


                <ComuCommentWriting>
                    <UserPicture>
                        {profilePicture ? <img src={profilePicture} alt="프로필" /> : <BiSolidUser />}
                    </UserPicture>
                    <div>
                        {username && <span>유저 닉네임: {username}</span>}

                    </div>
                    <form onSubmit={submitComment}>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                placeholder="댓글을 입력하세요..."
                                value={comment}
                                onChange={handleCommentChange}
                                style={{
                                    width: '500px',
                                    height: '70px',
                                    resize: 'none',
                                }}
                            />
                            <button
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
                                    justifyContent: 'center',
                                }}
                            >
                                작성
                            </button>
                        </div>
                    </form>
                    <MenuIcon2 onClick={toggleCommentMenu} onKeyDown={toggleCommentMenu} role="button" tabIndex={0}>
                        <BiDotsVerticalRounded />
                        {isCommentMenuOpen && (
                            <>
                                <CommunityCommentCorrection>수정</CommunityCommentCorrection>
                                <CommunityCommentDelete>삭제</CommunityCommentDelete>
                            </>
                        )}
                    </MenuIcon2>
                </ComuCommentWriting>
                <ComuComment />
            </CommunityCommentBox>
        </CommunityBoardContainer>
    );
}

export default CommunityBoard;
