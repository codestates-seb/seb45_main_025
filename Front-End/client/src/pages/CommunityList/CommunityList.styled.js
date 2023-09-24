import { styled } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const Input = styled.input`
  height: 2.8rem;
  width: 15rem;
  margin-bottom: 10px;
  padding: 5px;
  margin-top: 2rem;
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
  
  border: 1px solid gray;
  align-items: center;
  
`;
export const ListItemTitle = styled.div`
  font-size: 1.5rem;
  color: SaddleBrown;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  text-overflow: ellipsis;
  margin-right: auto;
 
`;

export const ListItemNumber = styled.div`
  font-size: 1rem;
  font-weight: 1px;
  
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 27px;
  padding-right: 8px;
  /* color: var(--brown-10); */
`;



export const ListItemComment = styled.div`
  font-size: .7rem;
  margin-left: auto;
  padding-right: 5px;
`;

export const ListItemDetails = styled.div`
  font-size: 0.5rem;
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
  width: 5rem;
  background: var(--brown-20);
  border: .1px solid black;
  height: 2.8rem;
  margin-top: 1.45rem;
  margin-left: .5rem;
  text-align: center;
 `;



export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: Arial, sans-serif;
  padding-bottom: 15px;
`;

export const DropdownButton = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  background-color: var(--brown-30);
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