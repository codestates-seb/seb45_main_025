import { SignUpContainer,
   SignUpTop, SignUpMain,
    SignUpName, SignUpGender, DateOfBirth,SignUpHomeAdress,
   SignupEmail, SignUpPassword, 
   SignUpPassWordDoubleCheck, SignUpSubmit } from './SignUp.styled';
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [emailBack, setEmailBack] = useState('');
  const [passWord, setPassWord] = useState('');
  const [passWordCheck, setpassWordCheck] = useState(false);
  const [passWordDoubleCheck, setPassWordDoubleCheck] = useState('');
  const passwordform = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
  function submitsignup(){
    console.log(name,gender)
  }
  
  return (
    <SignUpContainer>
      <SignUpTop><h1>Account</h1></SignUpTop>
      <SignUpMain>
        <h2>Sign Up</h2>
        <h3>2. Enter your information</h3>
        <div className='signup_border'>
          <SignUpName>
            <div>Name</div>
            <input onChange={(e)=>setName(e.target.value)}></input>
          </SignUpName>
          <SignUpGender>
            <div>Gender</div>
            <fieldset onChange={(e)=>setGender(e.target.value)}>
              <div>
                <input type='radio' value='male' id='male' name='gender' checked onClick={(e)=>setGender(e.target.value)}></input>
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
            <input type='date'></input>
          </DateOfBirth>
          <SignUpHomeAdress>
            <div>Home Adress</div>
            <input></input>
          </SignUpHomeAdress>
          <SignupEmail>
            <div>Email</div>
            <input className='emailfront'></input>
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
              <div>Password</div>
              <input type='password' onChange={(e)=>{
                setPassWord(e.target.value)
                setpassWordCheck(passwordform.test(e.target.value));
                console.log(passWordCheck,passWord,e.target.value)
                }}></input>
            </div>
            <div>{passWordCheck ? '✅ valid password' : '❌ The password must be at least 8 characters and include English, numbers, and special characters.'}</div>
          </SignUpPassword>
          <SignUpPassWordDoubleCheck>
            <div>confirm password</div>
            <input onChange={(e)=>(setPassWordDoubleCheck(e.target.value))}></input>
            <div>{passWordDoubleCheck === passWord ? '✅ Your password matches' : '❌ Passwords do not match'}</div>
          </SignUpPassWordDoubleCheck>

        </div>
      <SignUpSubmit onClick={submitsignup}>Submit</SignUpSubmit>
      </SignUpMain>
      
    </SignUpContainer>
  );
}
