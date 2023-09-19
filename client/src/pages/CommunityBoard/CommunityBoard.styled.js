import styled from "styled-components";

export const CommunityBoardContainer = styled.div`
    /* height: 100vh; */
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
    background-color: white;
    
`;

export const PostTitleBox = styled.div`
    height: 80px;
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    background-color: #FFFAF0;
    margin: 0 auto;
    margin-top: 1.5vh;
    display: flex;
    align-items: center;
    border-radius: 15px 15px 0 0;
    
`;
export const PostUserBox = styled.div`
    height: 50px;
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    background-color: #FFFAF0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    /* UserPicture와 span 사이에 간격을 줍니다. */
    > div > span:not(:last-child) {
        margin-right: 15px;
        padding-left: 5px;
    }
    border-color: transparent transparent burlywood transparent;
    border-style: solid;
    border-width: 2px;
`;



// export const CommunityComment = styled.div`
//     height: 170px;
//     max-height: auto;
//     width: 900px;
//     padding: 10px;
//     padding-top: 5px;
//     background-color: blueviolet;
//     overflow-y: auto;
//     margin: 0 auto;
//     margin-bottom: 20px;
//     margin-top: 10px;
// `;


export const PostBoard = styled.div`
    height: 300px;
    max-height: auto;
    width: 900px;
    padding: 10px;
    padding-top: 5px;
    background-color: #FFFAF0;
    overflow-y: auto;
    margin: 0 auto;
    margin-bottom: 20px;
`;

export const PostCorrection = styled.button`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFAF0;
    padding-bottom: 2px;
    margin-top: 80px;
    border-style: solid;
    border-width: 2px;
    border-color: burlywood;
    
`;

export const PostDelete = styled.button`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFAF0;
    margin-left: auto;
    border-color: burlywood;
    border-style: solid;
    border-width: 2px;
    padding-bottom: 2px;
    margin-right: 10px;
    margin-top: 2px;
`;



export const CommunityCommentCorrection = styled.button`
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

export const CommunityCommentDelete = styled.button`
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

export const CommunityCommentBox = styled.div`
    height: 200px;
    max-height: auto;
    width: 1000px;
    padding: 10px;
    padding-top: 5px;
    background-color: white;
    overflow-y: auto;
    margin: 0 auto;
    margin-bottom: 20px;
    
`;

// export const MenuIcon1 = styled.div`
//     height: 30px;
//     width: 60px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: yellow;
//     margin-left: auto;
//     margin-top: 6px;
//     padding-bottom: 2px;
//     margin-right: 10px;
// `;
export const MenuIcon1 = styled.div`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #FFFAF0;
    margin-left: auto;
    margin-top: 6px;
    padding-bottom: 2px;
    margin-right: 10px;
   
    
   
    svg {
        font-size: 1.5rem; 
        margin-left: 35px;
    }
`;
export const MenuIcon2 = styled.div`
    height: 30px;
    width: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-left: auto;
    margin-top: 6px;
    padding-bottom: 2px;
    margin-right: 10px;
    

   
    svg {
        font-size: 1.5rem;
        margin-left: 35px;
    }
`;

export const PostTitle = styled.div`
    height: 60px;
    width: 650px;
    padding: 10px;
    padding-top: 10px;
    font-size: 1.5rem;
    background-color: #FFFAF0;
    border-color: #FFFAF0;
    border-style: solid;
    display: flex;
    align-items: center;
`;

export const UserPicture = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: white; 
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* 사진이 넘치는 경우를 대비하여 숨김 처리 */
    img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 동그라미 안에 꽉 차게 표시됩니다. */
    
    }
`;

export const ComuComment = styled.div`
    width: 56rem;
    padding-top: 5px;
    border: 1px solid var(--gray-10);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const ComuCommentWriting = styled.div`
/* height: 100px; */
width: 900px;
padding: 10px;
/* padding-top: 15px; */
/* background-color: seashell; */
/* margin: 0 auto; */
/* margin-top: 100px; */

display: flex;
align-items: center;
justify-content: center;


> :not(:last-child) {
    margin-right: 10px;
}
`;

export const ComuCommentpost = styled.div`
    height: 70px;
    width: 500px;
    padding: 10px;
    padding-top: 5px;
    background-color: white;
    margin: 0; /* 왼쪽 정렬을 위해 margin을 0으로 설정 */
    display: flex;
    align-items: center;

    > :not(:last-child) {
        margin-right: 10px;
    }
`;