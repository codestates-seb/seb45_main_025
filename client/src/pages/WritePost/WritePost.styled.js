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
  margin-top: 20vh;
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
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid gray;
  display: flex;
  margin-bottom: -2px;
`;

export const TitleInput = styled.input`
  width: 900px;
  height: 45px;
  padding: 5px;
  font-size: 1.5rem;
  /* border:none; */
  border: 1px solid #d3d3d3;
`;

export const EditorContainer = styled.div`
  width: 1000px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
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
  margin-top: 3px;
  overflow-y: auto;
`;

export const PublishButtonContainer = styled.div`
  width: 1000px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
`;

export const PublishButton = styled.button`
  border: 1px solid gray;
  padding: 5px 20px 5px 20px;
`;