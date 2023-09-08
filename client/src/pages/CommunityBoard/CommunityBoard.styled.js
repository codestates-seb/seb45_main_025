import styled from "styled-components";

export const CommunityBoardContainer = styled.div`
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5vh;
`;

export const Line = styled.div`
    height: 2px;
    width: 40px;
    background-color: #FFA500;
    z-index: 2;
    margin-top: 200px;
`;

export const CommunityH = styled.div`
    height: 70px;
    width: 300px;
    background-color: white;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    padding-bottom: 80px;
    padding-top: 35px;
    font-size: 2.5rem;
`;

export const PostBox = styled.div`
    height: 700px;
    width: 1000px;
    background-color: gray;
    overflow-y: auto;
`;

export const PostTitle = styled.div`
    height: 100px;
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    font-size: 1.5rem;
    background-color: blue;
    margin: 0 auto;
    margin-top: 1.5vh;
    display: flex;
    align-items: center;
`;

export const PostBoard = styled.div`
    height: 620px;
    max-height: auto;
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    background-color: green;
    overflow-y: auto;
    margin: 0 auto;
    margin-bottom: 20px;
`;

export const PostCorrection = styled.div`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: greenyellow;
    margin-left: auto;
    margin-top: 6px;
    padding-bottom: 2px;
    margin-right: 10px;
`;

export const PostDelete = styled.div`
    height: 30px;
    width: 60px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-top: 6px;
    padding-bottom: 2px;
`;

export const CommunityCommentBox = styled.div`
    height: 200px;
    max-height: auto;
    width: 1000px;
    padding: 10px;
    padding-top: 5px;
    background-color: orange;
    overflow-y: auto;
    margin: 0 auto;
    margin-bottom: 20px;
`;

export const CommunityCommentCorrection = styled.div`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: greenyellow;
    margin-left: auto;
    margin-top: 6px;
    padding-bottom: 2px;
    margin-right: 10px;
`;

export const CommunityCommentDelete = styled.div`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    margin-left: auto;
    margin-top: 6px;
    padding-bottom: 2px;
    margin-right: 10px;
`;

export const CommunityComment = styled.div`
    height: 170px;
    max-height: auto;
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    background-color: blueviolet;
    overflow-y: auto;
    margin: 0 auto;
    margin-bottom: 20px;
    margin-top: 10px;
`;

export const MenuIcon1 = styled.div`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    margin-left: auto;
    margin-top: 6px;
    padding-bottom: 2px;
    margin-right: 10px;
`;
export const MenuIcon2 = styled.div`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    margin-left: auto;
    margin-top: 6px;
    padding-bottom: 2px;
    margin-right: 10px;
`;