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
    margin-Top:20vh;
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

`;



export const PostTitle = styled.div`
    height: 45px;
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    font-size: 1.5rem;
    background-color: blue;
    margin: 0 auto;
    margin-top: 1.5vh
`

export const PostBoard = styled.div`
    height: 62vh;
    max-height: auto; 
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    background-color: green;
    overflow-y: auto; 
    margin: 0 auto; 
    margin-bottom: 1.5vh;
`;