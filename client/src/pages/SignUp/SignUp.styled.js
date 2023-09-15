import { styled } from 'styled-components';

export const SignUpContainer = styled.div`
  height: 100rem;
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
    font-size: 2.5rem;
    margin: 2rem 0 5rem 0;
  }
  h3{
    font-size: 1.5rem;
    margin-right: auto;
    margin-left: 20vw;
    margin-bottom: 0.5rem;
    color: var(--gray-90);
  }
  .signup_border{
    width: 60vw;
    min-width: 20rem;
    border:  1px solid var(--brown-10);
    display: flex;
    flex-direction: column;
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-bottom: 2px;
    > div{
      margin-bottom: 1.5rem;
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
export const SignUpNickName = styled.div`
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

export const SignUpGender = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  > div{
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  fieldset{
    border: none;
    margin-left: 1rem;
    
  }
  label{
    color: var(--gray-90);
    display: inline;
  }
`

export const DateOfBirth = styled.div`
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
export const SignUpHomeAdress = styled.div`
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

export const SignUpPhoneNumber = styled.div`
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
export const SignupEmail = styled.div`
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
  select{
    height: 1.6rem;
    color: var(--gray-90);
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
    width: 8.5rem;
    color: var(--gray-90);
    font-size: 0.9rem;
    font-weight: 600;
  }
  input{
    margin-left: 1rem;
    height: 1.6rem;
  }
  .passwordcheck_logo{
    display: inline;
  }
  .passwordcheck{
    color: var(--gray-50);
    display: inline;
  }
`

export const SignUpPassWordDoubleCheck = styled.div`
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
    color: var(--gray-50);
    margin-left: 20px;
  }
`

export const SignUpSubmit =styled.button`
  border: 1px solid var(--gray-10);
  padding: 5px;
  border-radius: 5px;
  &:hover{
    background-color: var(--gray-10);
  }
`

