import {styled} from 'styled-components';

export const MyPageContainer = styled.div`
  height: 1500px;
`


export const MyPageMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
  .mypageetc{
    flex-direction: column;
    width: 60vw;
    margin-top: 5vh;
    padding-top: 1rem;
    border: 1px solid var(--gray-10);
    border-radius: 1rem;
    > div{
      margin-bottom: 30px;
    }
  }
  .what_wrong{
    height: 50px;
  }
  .mypagebtns{
    display: flex;
    flex-direction: row;
  }
`

export const MyOrder = styled.button`
  margin-left: 50vw;
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  > img{
    width: 1.2rem;
  }
  > p{
    font-size: 0.8rem;
  } 
  &:hover{
      background-color: var(--gray-10);;
    }
`

export const MyWriting = styled.button`
  margin-left: 0.1rem;
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  > img{
    width: 1.2rem;
  }
  > p{
    font-size: 0.8rem;
  } 
  &:hover{
      background-color: var(--gray-10);
    }
`

export const ChangeAccountBtn = styled.button`
  margin-left: 0.1rem;
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  > img{
    width: 1.2rem;
  }
  > p{
    font-size: 0.8rem;
  } 
  &:hover{
      background-color: var(--gray-10);;
    }
`

export const MyPageImg = styled.div`
  .myimg{
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }
`

export const MyPageName = styled.div`
  margin-left: 2vw;
  div:first-child{
  font-weight: 600;
  color: var(--gray-50);
  font-size: 0.9rem;
  }
  div:nth-child(2){
  color: var(--gray-50);
  margin-left: 0.3rem;
  font-size: 0.9rem;
 }
`
export const MyPageNickName = styled.div`
margin-left: 2vw;
  div:first-child{
  font-weight: 600;
  color: var(--gray-50);
  font-size: 0.9rem;
  }
  div:nth-child(2){
  color: var(--gray-50);
  margin-left: 0.3rem;
  font-size: 0.9rem;
 }
`
export const MyPageGender = styled.div`
  margin-left: 2vw;
  div:first-child{
  font-weight: 600;
  color: var(--gray-50);
  font-size: 0.9rem;
  }
  div:nth-child(2){
  color: var(--gray-50);
  margin-left: 0.3rem;
  font-size: 0.9rem;
  }
`
export const MyPageBirth = styled.div`
margin-left: 2vw;
div:first-child{
  font-weight: 600;
  color: var(--gray-50);
  font-size: 0.9rem;
 }
 div:nth-child(2){
  color: var(--gray-50);
  margin-left: 0.3rem;
  font-size: 0.9rem;
 }
`
export const MyPageAddress = styled.div`
  margin-left: 2vw;
  div:first-child{
  font-weight: 600;
  color: var(--gray-50);
  font-size: 0.9rem;
  }
  div:nth-child(2){
  color: var(--gray-50);
  margin-left: 0.3rem;
  font-size: 0.9rem;
 }
`
export const MyPageTel = styled.div`
  margin-left: 2vw;
  div:first-child{
  font-weight: 600;
  color: var(--gray-50);
  font-size: 0.9rem;
  }
  div:nth-child(2){
  color: var(--gray-50);
  margin-left: 0.3rem;
  font-size: 0.9rem;
 }
`
export const MyPageEmail = styled.div`
  margin-left: 2vw;
  div:first-child{
  font-weight: 600;
  color: var(--gray-50);
  font-size: 0.9rem;
  }
  div:nth-child(2){
  color: var(--gray-50);
  margin-left: 0.3rem;
  font-size: 0.9rem;
  }
`
