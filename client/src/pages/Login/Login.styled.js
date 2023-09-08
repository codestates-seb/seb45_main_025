import { styled } from 'styled-components';

export const LoginContainer = styled.div`
  height: 1500px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LoginMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-width: var(--main-width);
  padding: 5rem 0;
  > h2{
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 2.5rem;
    margin: 2rem 0 5rem 0;
  }
  .login_fillbox_oauth_container{
    width: 60vw;
    min-width: 20rem;
    border: 1px solid var(--brown-10);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    padding-bottom: 10vh;
    margin-bottom: 1.2rem;
  }
`;

export const LoginFillBox = styled.form`
  width: 30vw;
  display: flex;
  flex-direction: row;
  .login_id_pw_container{
    display: flex;
    flex-direction: column;
  }
  .login_id{
    width: 20vw;
    height: 3rem;
    font-size: 1rem;
    border-top:  1px solid var(--brown-10);
    border-right: none;
    border-bottom:  1px solid var(--brown-10);
    border-left: 1px solid var(--brown-10);
    font-weight: lighter;
  }
  .login_pw{
    width: 20vw;
    height: 3rem;
    font-size: 1.5vw;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid var(--brown-10);
    border-left: 1px solid var(--brown-10);
  }
  .submit{
    width: 10vw;
    height: 6rem;
    font-size: 20px;
    border: 1px solid var(--brown-10);
    background-color: rgba(189, 137, 97, 0.8);
    text-align: center;
    color: var(--gray-90);
    &:hover {
      background-color: var(--brown-10);
      cursor: pointer;
    }
  }
`;

export const LoginOauth = styled.div`
  margin-top: 30px;
  display: flex;
  .google_login{
    border: 1px solid var(--gray-10);
    width: 14vw;
    height: 2.5rem;
    margin-right: 0.5vw;
    font-size: 0.8rem;
    color: var(--gray-90)
  }
  .facebook_login{
    border: 1px solid var(--gray-10);
    background-color: #485793;
    width: 14vw;
    height: 2.5rem;
    margin-left: 0.5vw;
    color: white;
    font-size: 0.8rem;
  }
  img{
    width: 15px;
    background-color: white;
  }
`

export const LoginToLogUp = styled.div`
  display: flex;
  justify-content: center;
  width: 50vw;
  p{
    margin-top: 1rem;
    color: var(--gray-90);
    font-size: 0.9rem;
  }
  .login_to_signup{
    width: 10vw;
    height: 3rem;
    border: 1px solid var(--gray-10);
    color: var(--gray-90);
    margin-left: 5vw;
    font-size: 0.9rem;
    &:hover{
      background-color: var(--gray-10);;
    }
  }
`;