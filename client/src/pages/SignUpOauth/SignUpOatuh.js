import {SignUpOauthContainer,SignUpMain,
  SignUpName, SignUpGender, 
  DateOfBirth,SignUpHomeAdress,
   SignUpPhoneNumber, SignUpSubmit} from './SignUpOauth.styled';
import { useState } from "react";
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import  potatochip  from '../../common/image/potatochip.jpeg';

export default function SignUpOauth(){
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [adress, setAdress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  function submitsignup(){
    console.log(name,gender,birth,adress,phoneNumber)
  }

  return (
    <SignUpOauthContainer>
      <BackgroundImage imgSrc={potatochip} title='ACCOUNT'/>
      <SignUpMain>
        <h2>Sign Up</h2>
        <h3>2. Enter additional information</h3>
        <div className='signup_border'>
          <SignUpName>
            <div>Name</div>
            <input onChange={(e)=>setName(e.target.value)}></input>
          </SignUpName>
          <SignUpGender>
            <div>Gender</div>
            <fieldset>
              <div>
                <input type='radio' value='male' id='male' name='gender' onClick={(e)=>setGender(e.target.value)}></input>
                <label htmlFor="male" >Male</label>
              </div>
              <div>
                <input type='radio' value='female' id='female' name='gender' onClick={(e)=>setGender(e.target.value)}></input>
                <label htmlFor="female">Female</label>
              </div>
            </fieldset>
          </SignUpGender>
          <DateOfBirth>
            <div>Date Of Birth</div>
            <input type='date' onChange={(e)=>setBirth(e.target.value)} ></input>
          </DateOfBirth>
          <SignUpHomeAdress>
            <div>Home Adress</div>
            <input onChange={(e)=>setAdress(e.target.value)}></input>
          </SignUpHomeAdress>
          <SignUpPhoneNumber>
            <div>Tel</div>
            <input type='tel' onChange={(e)=>setphoneNumber(e.target.value)}></input>
          </SignUpPhoneNumber>
          </div>
          <SignUpSubmit onClick={submitsignup}>Sign Up</SignUpSubmit>
          </SignUpMain>
          
    </SignUpOauthContainer>
  )
}