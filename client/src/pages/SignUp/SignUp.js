import { SignUpContainer,SignUpMain,
  SignUpName,SignUpNickName,
  SignUpGender, 
  DateOfBirth,SignUpHomeAdress, SignUpPhoneNumber,
  SignupEmail, SignUpPassword, 
  SignUpPassWordDoubleCheck, SignUpSubmit } from './SignUp.styled';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import  potatochip  from '../../common/image/potatochip.jpeg';

export default function SignUp() {
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [emailFront, setEmailFront] = useState('');
  const [emailBack, setEmailBack] = useState('');
  const [passWord, setPassWord] = useState('');
  const [passWordCheck, setpassWordCheck] = useState(undefined);
  const [passWordDoubleCheck, setPassWordDoubleCheck] = useState(undefined);
  const [wrong, setWrong] = useState('');
  const passwordform = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;
  
  function submitsignup(){
    if(name === ''){
      setWrong("'Name' is Empty");
    }else if(nickName === ''){
      setWrong("'NickName' is Empty");
    }else if(gender === ''){
      setWrong("'Gender' is not selected");
    }else if(birth === ''){
      setWrong("'Date of birth' is Empty");
    }else if(address === ''){
      setWrong("'Home Address' is Empty");
    }else if(phoneNumber === ''){
      setWrong("'Tel' is Empty");
    }else if(emailFront === '' || emailBack === ''){
      setWrong("'Email' is Empty");
    }else if(passWordCheck === false || passWord !== passWordDoubleCheck){
      setWrong("Check your 'PassWord'");
    }else{
      console.log(name, gender, birth, address,phoneNumber, emailFront, emailBack,passWord,passWordDoubleCheck,passWordCheck);
      console.log(URI);
      axios.post(`${URI}/users/signup`,{ 
        "email": emailFront + '@' + emailBack,
        "name" : name,
        "nickName" : nickName,
        "password": passWord,
        "conformPassword": passWord,
        "gender" : gender,
        "phone": phoneNumber,
        "birth" : birth ,
        "address" : address
      })
      .then((res)=>{
        console.log(res)
        navigate('/')
      })
      .catch((res)=>{
        console.log(res)
        alert('can not make an account');
      })
    }
  }
  
  return (
    <SignUpContainer>
      <BackgroundImage imgSrc={potatochip} title='ACCOUNT'/>
      <SignUpMain>
        <h2>Sign Up</h2>
        <h3>2. Enter your information</h3>
        <div className='signup_border'>
          <SignUpName>
            <div>Name</div>
            <input onChange={(e)=>setName(e.target.value)}></input>
          </SignUpName>
          <SignUpNickName>
            <div>Nick Name</div>
            <input onChange={(e)=>setNickName(e.target.value)}></input>
          </SignUpNickName>
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
            <input type='date' onChange={(e)=>setBirth(e.target.value)} ></input>
          </DateOfBirth>
          <SignUpHomeAdress>
            <div>Home Address</div>
            <input onChange={(e)=>setAddress(e.target.value)}></input>
          </SignUpHomeAdress>
          <SignUpPhoneNumber>
            <div>Tel</div>
            <input type='tel' onChange={(e)=>setphoneNumber(e.target.value)}></input>
          </SignUpPhoneNumber>
          <SignupEmail>
            <div>Email</div>
            <input className='emailfront' onChange={(e)=>setEmailFront(e.target.value)}></input>
            <p>@</p>
            <input className='emailback' value={emailBack} onChange={(e)=>setEmailBack(e.target.value)}></input>
            <select onChange={(e)=>{e.target.value !== 'Enter directly' ? setEmailBack(e.target.value) : setEmailBack('')}}>
              <option>Enter directly</option>
              <option>gmail.com</option>
              <option>hotmail.com</option>
              <option>yahoo.com</option>
              <option>icloud.com</option>
            </select>
          </SignupEmail>
          <SignUpPassword>
            <div className='password_input'>
              <div className='passworddiv'>Password</div>
              <input type='password' onChange={(e)=>{
                setPassWord(e.target.value);
                console.log(passWordCheck,passWord,e.target.value);
                if(passwordform.test(e.target.value) === true){
                  setpassWordCheck(true)
                }
                }}
                onBlur={(e)=>{setpassWordCheck(passwordform.test(e.target.value))}}></input>
            </div>
            <div className='passwordcheck_logo'>{passWordCheck === undefined ? ' ' : passWordCheck ? '✅' : '❌' }
            <div className='passwordcheck'> The password must be at least 8 characters and include English, numbers, and special characters.</div>
            </div>
            
          </SignUpPassword>
          <SignUpPassWordDoubleCheck>
            <div>confirm password</div>
            <input type='password' onChange={(e)=>(setPassWordDoubleCheck(e.target.value))}></input>
            <div className='passworddoublecheck'>{passWordDoubleCheck === undefined ? ' ' : passWordDoubleCheck === passWord ? '✅ Your password matches' : '❌ Passwords do not match'}</div>
          </SignUpPassWordDoubleCheck>

        </div>
        <div className='what_wrong'>{wrong}</div>
      <SignUpSubmit onClick={submitsignup}>Sign Up</SignUpSubmit>
      </SignUpMain>
      
    </SignUpContainer>
  );
}
