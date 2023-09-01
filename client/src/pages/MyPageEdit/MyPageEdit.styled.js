import {styled} from 'styled-components';

export const MyPageEditContainer = styled.div`
  height: 120vh;
`

export const MyPageEditTop = styled.div`
  height: 30vh;
  width: 100vw;
  background-color: lightgray;

  > h1{
    text-align: center;
    display: block;
    font-size: 40px;
    color: white;
    padding-top: 50px;
  }
`

export const MyPageEditMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mypageeditetc{
    flex-direction: column;
    width: 60vw;
    margin-top: 5vh;
    > div{
      margin-bottom: 30px;
    }
  }
`

export const MyPageEditImg = styled.div`
  margin-top: 30px;
  position: relative;
  .myimg{
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }
  #upload{
    display: none;
  }
  .btn-upload{

  }
`

export const DeleteAccountBtn = styled.button`
  margin-left: 50vw;
  border: 0.3px solid black;
  padding: 5px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  > img{
    width: 25px;
  }
`

export const MyPageEditName = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
    font-size: large;
    font-weight: bold;
  }
  > input{
    margin-left: 20px;
  }
`
export const MyPageEditNickName = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
    font-size: large;
    font-weight: bold;
  }
  > input{
    margin-left: 20px;
  }
`

export const MyPageGender = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
    font-size: large;
    font-weight: bold;
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
    width: 140px;
    font-size: large;
    font-weight: bold;
  }
  > input{
    margin-left: 20px;
  }
`
export const MyPageHomeAdress = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
    font-size: large;
    font-weight: bold;
  }
  > input{
    margin-left: 20px;
    width: 40vw;
  }
`

export const MyPagePhoneNumber = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
    font-size: large;
    font-weight: bold;
  }
  > input{
    margin-left: 20px;
    width: 15vw;
  }
`
export const MyPageEmail = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
    font-size: large;
    font-weight: bold;
  }
  .emailfront{
    width: 15vw;
    margin-left: 20px;
  }
  .emailback{
    width: 10vw;
  }
`

export const MyPageSubmit = styled.button`
  margin-top: 5vh;
  border: 0.3px solid black;
  padding: 5px;
`