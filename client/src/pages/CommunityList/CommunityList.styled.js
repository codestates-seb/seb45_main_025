import styled from 'styled-components';

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
  margin-top: 150px;
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
  padding-bottom: 40px;
  padding-top: 35px;
  font-size: 2.5rem;
`;

export const Input = styled.input`
  width: 180px;
  margin-bottom: 10px;
  padding: 5px;
  margin-top: 15px;
`;

export const ListItem = styled.div`
  margin-bottom: -2px;
  padding: 10px;
  background-color: white;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  
`;


export const ListItemTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

export const ListItemDetails = styled.div`
  font-size: 0.8rem;
  color: gray;
`;

export const PaginationContainer = styled.div`

 display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    > li {
      height: 25px;
      width: 25px;
      display: flex;
      margin: 0 3px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      > a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 1rem;
      }
      &.previous,
      &.next {
        border-radius: 4px;
        background: var(--brown-20);
        color: #fff;
        margin: 0 5px;
      }
      &.active {
        background: var(--brown-10);
        font-weight: 600;
      }
    }
  }
  @media (max-width: 768px) {
    margin-top: 30px;
    display: none;
    &.always {
      display: flex;
    }
  }
`;

export const PostButton = styled.button`
  width: 50px;
  height: 30px;
  background: var(--brown-10);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const PostButtonContainer = styled.div`
  margin-top: 15px;
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export const Filter = styled.div`

  width: 70px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 5px;

`;

