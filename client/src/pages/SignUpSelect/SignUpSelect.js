import { SignUpSelectContainer, SignUpSelectTop, SignUpSelectMain } from './SignUpSelect.styled'
import google from'./google.png';
import facebook from './facebook.png';
import { Link } from "react-router-dom";

export default function SignUpSelect(){
  return (
    <SignUpSelectContainer>
      <SignUpSelectTop><h1>Account</h1></SignUpSelectTop>
      <SignUpSelectMain>
        <h2>Sign Up</h2>
        <h3>1. Choose how to sign up</h3>
        <div className='signup_select_main_container'>
          <div className='oauth_signup'>
          <button className='google_signup' ><img src={google} alt='google'/> Sign up with Google</button>
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