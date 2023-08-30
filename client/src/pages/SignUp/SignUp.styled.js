import { styled } from 'styled-components';

export const SignUpContainer = styled.div`
  height: 120vh;
`;

export const SignUpTop = styled.div`
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
`;

export const SignUpMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  > h2{
    padding-top: 50px;
    font-size: 30px;
  }

  h3{
    font-size: 25px;
    margin-top: 10vh;
    margin-right: auto;
    margin-left: 20vw;
  }
  .signup_border{
    width: 60vw;
    border: 0.3px solid black;
    display: flex;
    flex-direction: column;
    padding-top: 5vh;
    padding-bottom: 10vh;
    margin-bottom: 20px;
  }
`
export const SignUpName = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
`

export const SignUpGender = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  fieldset{
    border: none;
  }
`

export const DateOfBirth = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
`
export const SignUpHomeAdress = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
`
export const SignupEmail = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
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
`

export const SignUpPassWordDoubleCheck = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
`

export const SignUpSubmit =styled.div`
  border: 0.2px solid black;
`