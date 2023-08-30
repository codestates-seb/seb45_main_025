import { LoginContainer, LoginTop,LoginMain,LoginFillBox, LoginToLogUp, LoginOauth } from './Login.styled';
import google from'./google.png';
import facebook from './facebook.png';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [passWord, setPassWord] = useState('');

  function loginsubmit(){
    loginId
    passWord
  }
  return (
    <LoginContainer>
      <LoginTop>
        <h1>Account</h1>
      </LoginTop>
      <LoginMain>
        <h2>Login</h2>
        <div className='login_fillbox_oauth_container'>
          <LoginFillBox>
            <div className='login_id_pw_container'>
              <input className='login_id' onChange={(e)=>setLoginId(e.target.value)}></input>
              <input type='password' className='login_pw' onChange={(e)=>setPassWord(e.target.value)}></input>
            </div>
            <input type='submit' className='submit' value='login' onClick={loginsubmit}></input>
          </LoginFillBox>
          <LoginOauth>
            <button className='google_login'><img src={google} alt='google' /> Login with Google</button>
            <button className='facebook_login'><img src={facebook} alt='facebook' /> Login with Facebook</button>
          </LoginOauth>
        </div>
        <LoginToLogUp>
          <p>{"Don't have an account?"}</p>
          <Link to = '/signup/select'><button className='login_to_signup'>Sign up</button></Link>
        </LoginToLogUp>
      </LoginMain>
      
    </LoginContainer>
  );
}
