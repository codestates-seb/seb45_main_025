import { styled } from 'styled-components';

export const SignUpContainer = styled.div`
  height: 1800px;
`;


export const SignUpMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 5rem 0;

  > h2{
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }

  h3{
    font-size: 25px;
    margin-right: auto;
    margin-left: 20vw;
    margin-bottom: 5px;
    color: var(--gray-90);
  }
  .signup_border{
    width: 60vw;
    border:  1px solid var(--brown-10);
    display: flex;
    flex-direction: column;
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-bottom: 2px;
    > div{
      margin-bottom: 30px;
    }
  }
  .what_wrong{
    height: 50px;
  }
`
export const SignUpName = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
  }
  > input{
    margin-left: 20px;
  }
`
export const SignUpNickName = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
  }
  > input{
    margin-left: 20px;
  }
`

export const SignUpGender = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
  }
  fieldset{
    border: none;
    margin-left: 20px;
  }
`

export const DateOfBirth = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
  }
  > input{
    margin-left: 20px;
  }
`
export const SignUpHomeAdress = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
  }
  > input{
    margin-left: 20px;
    width: 40vw;
  }
`

export const SignUpPhoneNumber = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
  }
  > input{
    margin-left: 20px;
    width: 15vw;
  }
`
export const SignupEmail = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 140px;
  }
  .emailfront{
    width: 15vw;
    margin-left: 20px;
  }
  .emailback{
    width: 10vw;
  }
`

export const SignUpPassword = styled.div`
  margin-left: 2vw;
  display: flex;
  flex-direction: column;
  .password_input{
    display: flex;
    flex-direction: row;
  }
  .passworddiv{
    width: 140px;
  }
  input{
    margin-left: 20px;
  }
  .passwordcheck{
    color: gray;
  }
`

export const SignUpPassWordDoubleCheck = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  div:first-child{
    width: 140px;
  }
  input{
    margin-left: 20px;
  }
  .passworddoublecheck{
    color: gray;
    margin-left: 20px;
  }
`

export const SignUpSubmit =styled.button`
  border: 1px solid var(--gray-10);
  padding: 5px;
  border-radius: 5px;
`
