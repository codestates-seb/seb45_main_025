import { styled } from 'styled-components';

export const LoginContainer = styled.div`
  height: 1500px;
`;

export const LoginMain = styled.div`
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

  .login_fillbox_oauth_container{
    width: 60vw;
    border: 1px solid var(--brown-10);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    padding-bottom: 10vh;
    margin-bottom: 20px;
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
    height: 3.5vw;
    font-size: 1.5vw;
    border-top:  1px solid var(--brown-10);
    border-right: none;
    border-bottom:  1px solid var(--brown-10);
    border-left: 1px solid var(--brown-10);
    font-weight: lighter;
  }
  .login_pw{
    width: 20vw;
    height: 3.5vw;
    font-size: 1.5vw;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid var(--brown-10);
    border-left: 1px solid var(--brown-10);
  }
  .submit{
    width: 10vw;
    height: 7vw;
    font-size: 20px;
    border: 1px solid var(--brown-10);
    background-color: rgba(189, 137, 97, 0.4);
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
    height: 40px;
    margin-right: 0.5vw;
  }
  .facebook_login{
    border: 1px solid var(--gray-10);
    background-color: #485793;
    width: 14vw;
    height: 40px;
    margin-left: 0.5vw;
    color: white;
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
    margin-top: 15px;
  }
  .login_to_signup{
    width: 200px;
    height: 50px;
    border: 1px solid var(--gray-10);
    margin-left: 100px;
  }
`;