import { styled } from 'styled-components';

export const LoginContainer = styled.div`
  height: 120vh;
`;

export const LoginTop = styled.div`
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

export const LoginMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  > h2{
    padding-top: 50px;
    font-size: 30px;
  }
  .login_fillbox_oauth_container{
    width: 60vw;
    border: 0.3px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    padding-bottom: 10vh;
    margin-top: 10vh;
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
    border-top: 0.3px solid black;
    border-right: none;
    border-bottom: 0.3px solid black;
    border-left: 0.3px solid black;
    font-weight: lighter;
  }

  .login_pw{
    width: 20vw;
    height: 3.5vw;
    font-size: 1.5vw;
    border-top: none;
    border-right: none;
    border-bottom: 0.3px solid black;
    border-left: 0.3px solid black;
  }

  .submit{
    width: 10vw;
    height: 7vw;
    font-size: 20px;
  }
`;

export const LoginOauth = styled.div`
  margin-top: 30px;
  display: flex;
  .google_login{
    border: 0.5px solid black;
    width: 14vw;
    height: 40px;
    margin-right: 0.5vw;
  }

  .facebook_login{
    border: 0.5px solid black;
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
    border: 0.5px solid black;
    margin-left: 100px;
  }
`;