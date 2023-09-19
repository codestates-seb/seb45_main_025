import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.div`
  height: 2px;
  width: 40px;
  background-color: #FFA500;
  z-index: 2;
  margin-top: 5vh;
`;

export const Title = styled.div`
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

export const InputContainer = styled.div`
  width: 1000px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: var(--brown-30);
  border: 1px solid gray;
  display: flex;
  margin-bottom: -2px;
 
`;

export const TitleInput = styled.input`
  width: 900px;
  height: 60px;
  padding: 5px;
  font-size: 1.5rem;
  /* border:none; */
  border: 1px solid #d3d3d3;
  border-radius: 15px;
`;

export const EditorContainer = styled.div`
  width: 1000px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: var(--brown-30);
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  overflow: auto;
  margin-bottom: 20px;
`;

export const EditorWrapper = styled.div`
  margin-bottom: 10px;
  width: 900px;
  height: 100%;
  /* height: 800px; */
  margin-top: 20px;
  overflow-y: auto;
  background-color: white;
  border-radius:15px ;
  border-color: white;
  border-width: 13px;
  border-style: solid;
`;

export const ImageInput = styled.div`
  margin-right: auto;
  margin-left: 3.2rem;
  >img{
    height: 100px;
  }
  .myimg{
    border-radius: 100%;
    width: 6rem;
    height: 6rem;
  }
  #upload{
    display: none;
  }
  .btn-upload{
    margin-bottom: 1rem;
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.3rem;
    font-size: 0.8rem;
    text-align: center;
    cursor: pointer;
    &:hover{
      background-color: var(--gray-10);;
    }
  }
`

export const PublishButtonContainer = styled.div`
  width: 1000px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
`;

export const PublishButton = styled.button`
  width: 70px;
  height: 40px;
  background: var(--brown-20);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  text-align: center;
`;

export const BackgroundImageContainer = styled.div`
  width: 100vw;
  height: 25rem;
  background-image: ${({ backgroundImage }) => backgroundImage};
  background-size: cover;
  background-position: center 20%;

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  font-weight: 1000;
  letter-spacing: 3px;
  padding-top: 3rem;
  padding-bottom: 5rem;
  margin-bottom: 2rem;
`;