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
    > div{
      margin-bottom: 30px;
    }
  }
  .what_wrong{
    height: 50px;
  }
`

export const MyPageImg = styled.div`
  .myimg{
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }
`

export const ChangeAccountBtn = styled.button`
  margin-left: 50vw;
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  > img{
    width: 25px;
  }
`

export const MyPageName = styled.div`
margin-left: 2vw;
 div:first-child{
  font-size: large;
  font-weight: bold;
 }
`
export const MyPageNickName = styled.div`
margin-left: 2vw;
 div:first-child{
  font-size: large;
  font-weight: bold;
 }
`
export const MyPageGender = styled.div`
margin-left: 2vw;
div:first-child{
  font-size: large;
  font-weight: bold;
 }
`
export const MyPageBirth = styled.div`
margin-left: 2vw;
div:first-child{
  font-size: large;
  font-weight: bold;
 }
`
export const MyPageAddress = styled.div`
margin-left: 2vw;
div:first-child{
  font-size: large;
  font-weight: bold;
 }
`
export const MyPageTel = styled.div`
margin-left: 2vw;div:first-child{
  font-size: large;
  font-weight: bold;
 }
`
export const MyPageEmail = styled.div`
margin-left: 2vw;
div:first-child{
  font-size: large;
  font-weight: bold;
 }
`
