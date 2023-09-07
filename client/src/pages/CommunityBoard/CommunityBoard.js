
// import React from 'react';

import { CommunityBoardContainer, Line, CommunityH, PostBox, PostTitle, PostBoard } from "./CommunityBoard.styled.js";

function CommunityBoard({ title, content }) {
    return (
        <CommunityBoardContainer>
            <Line />
            <CommunityH>Community</CommunityH>
            <PostBox>
                <PostTitle>{title}제목위치 확인용 나중에글씨지우기</PostTitle>
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
        </CommunityBoardContainer>
    );
}

export default CommunityBoard;

