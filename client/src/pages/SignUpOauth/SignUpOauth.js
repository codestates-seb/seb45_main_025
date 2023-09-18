import {SignUpOauthContainer,SignUpMain,
  SignUpName, SignUpGender, 
  DateOfBirth,SignUpHomeAdress,
   SignUpPhoneNumber, SignUpSubmit} from './SignUpOauth.styled';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import  potatochip  from '../../common/image/potatochip.jpeg';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function SignUpOauth(){
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [now, setNow] = useState('');
  const URI = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth()+1;
    let date = nowDate.getDate();
    if (month < 10){
      month = '0'+String(month);
    }
    setNow(`${year}-${month}-${date}`)
  },[]);

  function submitsignup(){
    let access_token = getAccessToken();
    axios.post(`${URI}/oauth/google/signup`,{
        "address" : address,
        "phoneNumber": phoneNumber,
        "gender" : gender,
        "name" : name,
        "birth" : birth },{headers: {Authorization: access_token}})
    .then((res)=>{
      console.log(res);
      navigate('/login');
    })
    .catch((res)=>{
      console.log(res);
    })
    console.log(name,gender,birth,address,phoneNumber)
  }



  return (
    <SignUpOauthContainer>
      <BackgroundImage imgSrc={potatochip} title='ACCOUNT'/>
      <SignUpMain>
        <h2>Sign Up</h2>
        <h3>2. Enter additional information<span className='optional'>(optional)</span></h3>
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
                <label htmlFor="male" > Male</label>
              </div>
              <div>
                <input type='radio' value='female' id='female' name='gender' onClick={(e)=>setGender(e.target.value)}></input>
                <label htmlFor="female"> Female</label>
              </div>
            </fieldset>
          </SignUpGender>
          <DateOfBirth>
            <div>Date Of Birth</div>
            <input type='date' max = {now} onChange={(e)=>setBirth(e.target.value)} ></input>
          </DateOfBirth>
          <SignUpHomeAdress>
            <div>Home Adress</div>
            <input onChange={(e)=>setAddress(e.target.value)}></input>
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