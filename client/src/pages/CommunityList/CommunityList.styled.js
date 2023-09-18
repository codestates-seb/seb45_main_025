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
  width: 220px;
  margin-bottom: 10px;
  padding: 5px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
  border-radius: 8px;
  text-align: center;
`;

export const PostButtonContainer = styled.div`
  margin-top: 15px;
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  
`;
export const SearchContainer = styled.div`
  
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
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


export const SearchButton = styled.button`
  width: 70px;
  background: var(--brown-20);
  height: 30px;
  margin-top: 5px;
  border-radius: 8px;
  margin-left: 5px;
  text-align: center;
 
  `



export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: Arial, sans-serif;
  padding-bottom: 15px;
`;

export const DropdownButton = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex; /* 가로 정렬을 위해 flex 레이아웃 사용 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: center; /* 가로 가운데 정렬 */

`;

export const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
`;

export const DropdownOption = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
  
`;
export const Icon = styled.div`
  padding-right: 10px;
  padding-top: 3px;
`;