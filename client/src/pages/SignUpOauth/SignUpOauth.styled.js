import { styled } from "styled-components";

export const SignUpOauthContainer = styled.div`
  height: 140vh;
`
export const SignUpTop = styled.div`
  height: 30vh;
  width: 100vw;
  background-color: lightgray;

  > h1{
    text-align: center;
    display: block;
    font-size: 40px;
    color: white;
    padding-top: 60px;
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
    padding-bottom: 5vh;
    margin-bottom: 40px;
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

export const SignUpSubmit =styled.div`
  border: 0.2px solid black;
  padding: 5px;
`

