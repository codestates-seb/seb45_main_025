import { useState } from 'react';
import {
    CommunityBoardContainer,
    CommunityCommentBox,
    CommunityCommentDelete,
    CommunityCommentCorrection,
    CommunityComment,
    Line,
    CommunityH,
    PostBox,
    PostTitle,
    PostBoard,
    PostCorrection,
    PostDelete,
    MenuIcon1,
    MenuIcon2
} from './CommunityBoard.styled.js';

function CommunityBoard({ title, content }) {
    const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

    const toggleCommentMenu = () => {
        setIsCommentMenuOpen(!isCommentMenuOpen);
    };

    const togglePostMenu = () => {
        setIsPostMenuOpen(!isPostMenuOpen);
    };

    return (
        <CommunityBoardContainer>
            <Line />
            <CommunityH>Community</CommunityH>
            <PostBox>
                <PostTitle>
                    {title}제목위치 확인용 나중에글씨지우기
                    <MenuIcon1 onClick={togglePostMenu} onKeyDown={togglePostMenu} role="button" tabIndex={0}>
                        {/* 아이콘 내용 */}
                    </MenuIcon1>
                    {isPostMenuOpen && (
                        <>
                            <PostCorrection>수정</PostCorrection>
                            <PostDelete>삭제</PostDelete>
                        </>
                    )}
                </PostTitle>
                <PostBoard>
                    {/* 이 곳에 게시물 컴포넌트 렌더링 */}
                    {/* 예시:
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    */}
                    {/* content를 출력 */}
                    <div>{content}</div>
                </PostBoard>
            </PostBox>
            <CommunityCommentBox>
                <CommunityComment>
                    <MenuIcon2 onClick={toggleCommentMenu} onKeyDown={toggleCommentMenu} role="button" tabIndex={0}>
                        {/* 아이콘 내용 */}
                    </MenuIcon2>
                    {isCommentMenuOpen && (
                        <>
                            <CommunityCommentCorrection>수정</CommunityCommentCorrection>
                            <CommunityCommentDelete>삭제</CommunityCommentDelete>

                        </>
                    )}
                </CommunityComment>
            </CommunityCommentBox>
        </CommunityBoardContainer>
    );
}

export default CommunityBoard;
