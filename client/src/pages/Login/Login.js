import { LoginContainer,LoginMain,LoginFillBox, LoginToLogUp, LoginOauth } from './Login.styled';
import google from '../../common/image/google.png';
import facebook from '../../common/image/facebook.png';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import  potatochip  from '../../common/image/potatochip.jpeg';

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [passWord, setPassWord] = useState('');
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;
  function googlesignup(){
    window.location.href = `${URI}/oauth2/authorization/google`;
  }
  function loginsubmit(){
    axios.post(`${URI}/users/login`,{
      "email" : loginId, 
      "password" : passWord
      })
    .then((res)=>{
      console.log(res)
      localStorage.setItem('access_token',res.headers.authorization)
      localStorage.setItem('refresh_token',`Bearer ${res.headers.refresh}`)
      navigate('/');
    })
    .catch(()=>{
      alert('Login failed')
    })
  }
 
  return (
    <LoginContainer>
      <BackgroundImage imgSrc={potatochip} title='ACCOUNT'/>
      <LoginMain>
        <h2>Login</h2>
        <div className='login_fillbox_oauth_container'>
          <LoginFillBox>
            <div className='login_id_pw_container'>
              <input className='login_id' onChange={(e)=>setLoginId(e.target.value)}></input>
              <input type='password' className='login_pw' onChange={(e)=>setPassWord(e.target.value)}></input>
            </div>
            <input type='button' className='submit' value='login' onClick={loginsubmit}></input>
          </LoginFillBox>
          <LoginOauth>
            <button className='google_login' onClick={googlesignup} ><img src={google} alt='google' /> Login with Google</button>
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
