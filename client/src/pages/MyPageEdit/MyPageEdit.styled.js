import {styled} from 'styled-components';

export const MyPageEditContainer = styled.div`
  height: 1800px;
`

export const MyPageEditMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
  .mypageeditetc{
    flex-direction: column;
    width: 60vw;
    margin-top: 5vh;
    > div{
      margin-bottom: 1.7rem;
    }
  }
`

export const MyPageEditImg = styled.div`
  position: relative;
  .myimg{
    border-radius: 100%;
    width: 6rem;
    height: 6rem;
  }
  #upload{
    display: none;
  }
  .btn-upload{
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

export const DeleteAccountBtn = styled.button`
  margin-left: 50vw;
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
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

export const MyPageEditName = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  > input{
    margin-left: 1rem;
    height: 1.6rem;
  }
`

export const MyPageEditNickName = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  > input{
    margin-left: 1rem;
    height: 1.6rem;
  }
`

export const MyPageGender = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    font-size: 0.9rem;
    font-weight: 600;
  }
  fieldset{
    border: none;
    margin-left: 20px;
  }
`
export const MyPageDateOfBirth = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  > input{
    margin-left: 1rem;
    height: 1.6rem;
  }
`
export const MyPageHomeAdress = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  > input{
    margin-left: 1rem;
    height: 1.6rem;
  }
`

export const MyPagePhoneNumber = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  > input{
    margin-left: 1rem;
    height: 1.6rem;
  }
`
export const MyPageEmail = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  .emailfront{
    width: 15vw;
    margin-left: 1rem;
    height: 1.6rem;
  }
  .emailback{
    width: 10vw;
    height: 1.6rem;
  }
`

export const MyPagePassword = styled.div`
  margin-left: 2vw;
  display: flex;
  flex-direction: column;
  .password_input{
    display: flex;
    flex-direction: row;
    height: 1.6rem;
  }
  .passworddiv{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  input{
    margin-left: 1rem;
  }
  .passwordcheck{
    color: gray;
  }
`

export const MyPagePassWordDoubleCheck = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  div:first-child{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  input{
    margin-left: 1rem;
    height: 1.6rem;
  }
  .passworddoublecheck{
    color: gray;
    margin-left: 1rem;
  }
`

export const MyPageSubmit = styled.button`
  margin-top: 5vh;
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 5px;
  &:hover{
      background-color: var(--gray-10);;
    }
`