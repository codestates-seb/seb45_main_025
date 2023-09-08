import { SignUpSelectContainer, SignUpSelectMain } from './SignUpSelect.styled'
import google from'../../common/image/google.png';
import facebook from '../../common/image/facebook.png';
import { Link } from "react-router-dom";
import axios from 'axios';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import  potatochip  from '../../common/image/potatochip.jpeg';

export default function SignUpSelect(){
  const URI = process.env.REACT_APP_API_URL;
  function googlesignup(){
    axios.post(`${URI}/login/callback`)
    .then((res)=>{
      console.log(res)
    })
    .catch((res)=>console.log(res))
  }
  return (
    <SignUpSelectContainer>
      <BackgroundImage imgSrc={potatochip} title='ACCOUNT'/>
      <SignUpSelectMain>
        <h2>Sign Up</h2>
        <h3>1. Choose how to sign up</h3>
        <div className='signup_select_main_container'>
          <div className='oauth_signup'>
          <button className='google_signup' onClick={googlesignup}><img src={google} alt='google'/> Sign up with Google</button>
          <button className='facebook_signup' ><img src={facebook} alt='facebook'/> Sign up with Facebook</button>
          </div>
          <div className='line'></div>
          <div className='rightline'></div>
          <Link to ='/signup'><button className='sign_up'>Sign up</button></Link>
        </div>
      </SignUpSelectMain>
    </SignUpSelectContainer>
  )
}