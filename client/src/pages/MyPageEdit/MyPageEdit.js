import {MyPageEditContainer,
   MyPageEditMain, MyPageEditImg,DeleteAccountBtn,
    MyPageEditName, MyPageEditNickName,MyPageGender,
    MyPageDateOfBirth,MyPageHomeAdress,
    MyPagePhoneNumber,MyPageEmail
    ,MyPagePassword,MyPagePassWordDoubleCheck
    ,MyPageSubmit
  } from './MyPageEdit.styled';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import basicimg from '../../common/image/basicimg.png';
import trashcan from '../../common/image/trashcan.png';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import  chococookie  from '../../common/image/darkcookies.jpg';
import axios from 'axios';

export default function MyPageEdit(){
  const [myImg, setMyImg] = useState(null);
  const [name, setName] = useState('');
  const [nickName,setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [adress, setAdress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [emailFront, setEmailFront] = useState('');
  const [emailBack, setEmailBack] = useState('');
  const [passWord, setPassWord] = useState('');
  const [passWordCheck, setpassWordCheck] = useState(false);
  const [passWordDoubleCheck, setPassWordDoubleCheck] = useState('');
  const passwordform = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const [wrong, setWrong] = useState('');
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;

  function imgupload(e){
      if(e.target.value !==''){
      const reader = new FileReader();
      reader.onload = (e) => {	
        setMyImg(e.target.result); // 파일의 컨텐츠
        console.log(myImg)
      };
      reader.readAsDataURL(e.target.files[0]);
      axios.post(`${URI}`)
  }
  }

  function deleteaccount(){
    const del = confirm('계정을 삭제하시겠습니까?');
    if (del){
      console.log("계정 삭제")
      axios.delete(`${URI}/users/delete2`)
      .then((res)=>{
        console.log(res);

      })
      .catch((res)=>console.log(res))
      navigate('/')
    }else{
      console.log('계정 삭제 취소')
    }
  }

  function submitsignup(){
    if(name === ''){
      setWrong("'Name' is Empty");
    }else if(nickName === ''){
      setWrong("'NickName' is Empty");
    }else if(gender === ''){
      setWrong("'Gender' is not selected");
    }else if(birth === ''){
      setWrong("'Date of birth' is Empty");
    }else if(adress === ''){
      setWrong("'Home Adress' is Empty");
    }else if(phoneNumber === ''){
      setWrong("'Tel' is Empty");
    }else if(passWordCheck === false || passWord !== passWordDoubleCheck){
      setWrong("Check your 'PassWord'");
    }else{
      axios.patch(`${URI}/users`,{
        
      },{ headers: {Authorization: localStorage.getItem('access_token')} })
      .then((res)=>console.log(res))
      .catch((res)=>console.log(res))
    }
    console.log(name,nickName,gender,birth,adress,phoneNumber,emailFront)
  }
  
  return (
    <MyPageEditContainer>
      <BackgroundImage imgSrc={chococookie} title='MY PAGE'/>
      <MyPageEditMain>
        <MyPageEditImg>
          {myImg === null ? <img src={basicimg} alt='img' className='myimg'></img> : <img src={myImg} alt="img" className='myimg'></img>}
          <label htmlFor="upload">
            <div className="btn-upload">select image</div>
          </label>
          <input type="file" name="image" id="upload" accept="image/*" onChange={(e)=>imgupload(e)} />
        </MyPageEditImg>
        <div className='mypageeditetc'>
          <DeleteAccountBtn onClick={deleteaccount}>
            <img src={trashcan} alt='delete' />
            <p>Delete Account</p>
          </DeleteAccountBtn>
          <MyPageEditName>
            <div>Name</div>
            <input onChange={(e)=>setName(e.target.value)}></input>
          </MyPageEditName>
          <MyPageEditNickName>
            <div>NickName</div>
            <input onChange={(e)=>setNickName(e.target.value)}></input>
          </MyPageEditNickName>
          <MyPageGender>
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
          </MyPageGender>
          <MyPageDateOfBirth>
            <div>Date Of Birth</div>
            <input type='date' onChange={(e)=>setBirth(e.target.value)} ></input>
          </MyPageDateOfBirth>
          <MyPageHomeAdress>
            <div>Home Adress</div>
            <input onChange={(e)=>setAdress(e.target.value)}></input>
          </MyPageHomeAdress>
          <MyPagePhoneNumber>
            <div>Tel</div>
            <input type='tel' onChange={(e)=>setphoneNumber(e.target.value)}></input>
          </MyPagePhoneNumber>
          <MyPageEmail>
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
          </MyPageEmail>
          <MyPagePassword>
            <div className='password_input'>
              <div className='passworddiv'>Password</div>
              <input type='password' onChange={(e)=>{
                setPassWord(e.target.value)
                setpassWordCheck(passwordform.test(e.target.value));
                console.log(passWordCheck,passWord,e.target.value)
                }}></input>
            </div>
            <div className='passwordcheck'>{passWordCheck ? '✅ valid password' : '❌ The password must be at least 8 characters and include English, numbers, and special characters.'}</div>
          </MyPagePassword>
          <MyPagePassWordDoubleCheck>
            <div>confirm password</div>
            <input type='password' onChange={(e)=>(setPassWordDoubleCheck(e.target.value))}></input>
            <div className='passworddoublecheck'>{passWordDoubleCheck === passWord ? '✅ Your password matches' : '❌ Passwords do not match'}</div>
          </MyPagePassWordDoubleCheck>
        </div>
        <div className='what_wrong'>{wrong}</div>
        <MyPageSubmit onClick={submitsignup}>Save change</MyPageSubmit>
      </MyPageEditMain>
    </MyPageEditContainer>
  )
}