import {MyPageEditContainer,
   MyPageEditMain, MyPageEditImg,DeleteAccountBtn,
    MyPageEditName, MyPageEditNickName,MyPageGender,
    MyPageDateOfBirth,MyPageHomeAdress,
    MyPagePhoneNumber,MyPageEmail
    ,MyPagePassword,MyPagePassWordDoubleCheck
    ,MyPageSubmit
  } from './MyPageEdit.styled';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import basicimg from '../../common/image/basicimg.png';
import trashcan from '../../common/image/trashcan.png';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import  chococookie  from '../../common/image/darkcookies.jpg';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function MyPageEdit(){
  const [memberId, setMemberId] = useState('');
  const [myImg, setMyImg] = useState(null);
  const [name, setName] = useState('');
  const [nickName,setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [emailFront, setEmailFront] = useState('');
  const [emailBack, setEmailBack] = useState('');
  const [passWord, setPassWord] = useState('');
  const [passWordCheck, setpassWordCheck] = useState(undefined);
  const [passWordDoubleCheck, setPassWordDoubleCheck] = useState(undefined);
  const passwordform = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const [wrong, setWrong] = useState('');
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;
  const [now, setNow] = useState('');

  function imgupload(e){
    if(e.target.value !==''){
      const reader = new FileReader();
      reader.onload = (e) => {	
        setMyImg(e.target.result); // 파일의 컨텐츠
      };
      reader.readAsDataURL(e.target.files[0]);
      let access_token = getAccessToken();
      console.log(access_token)
      const formData = new FormData();
      formData.append('image',e.target.files[0]);
      axios.patch(`${URI}/mypage/pofileImage`,formData,{ headers: {Authorization: access_token,'Content-Type': 'multipart/form-data'}}
      )
      .then((res)=>{
        console.log('ji')
        console.log(res.data.originalFileName, res.data.saveFileName)
      }).catch((res)=>{
        console.log(res)
        console.log(formData)
      })
  }
  }

  function deleteaccount(){
    const del = confirm('Want to delete your account?');
    if (del){
      console.log("계정 삭제")
      let access_token = getAccessToken();
      axios.delete(`${URI}/users/delete/${memberId}`,{ headers: {Authorization: access_token} })
      .then((res)=>{
        console.log(res);
        localStorage.clear()
        navigate('/')
      })
      .catch((res)=>console.log(res))
    }else{
      console.log('계정 삭제 취소')
    }
  }

  useEffect(() => {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth()+1;
    let date = nowDate.getDate();
    if (month < 10){
      month = '0'+String(month);
    }
    setNow(`${year}-${month}-${date}`)
    setMyImg(null);
    let access_token = getAccessToken();
    console.log(access_token);
    axios.get(`${URI}/mypage`,{ headers: {Authorization: access_token} })
    .then((res)=>{
      console.log(res);
      setMemberId(res.data.userId)
      setMyImg(res.data.saveFileName);
      setName(res.data.name);
      setNickName(res.data.nickName)
      setGender(res.data.gender);
      setBirth(res.data.birth);
      setAddress(res.data.address);
      setphoneNumber(res.data.phone);
      let email = res.data.email.split('@');
      setEmailFront(email[0]);
      setEmailBack(email[1]);
    }).catch((res)=>{console.log(res)})
  },[]);

  function submitsignup(){
    if(nickName === ''){
      setWrong("'NickName' is Empty");
    }else if(emailFront === '' || emailBack === ''){
      setWrong("'Email' is Empty");
    }else if(passWordCheck === false || passWord !== passWordDoubleCheck){
      setWrong("Check your 'PassWord'");
    }else{
      let access_token = getAccessToken();
      axios.patch(`${URI}/mypage`,{
        "name" : name,
        "nickName" : nickName,
        "gender" : gender,
        "birth" : birth,
        "address" : address,
        "phone" : phoneNumber,
        "email" : emailFront + '@' + emailBack,
        "password" : passWord
      },{ headers: {Authorization: access_token} })
      .then(()=>navigate('/mypage'))
      .catch((res)=>console.log(res))
    }
    console.log(name,nickName,gender,birth,address,phoneNumber,emailFront,passWord)
  }
  
  return (
    <MyPageEditContainer>
      <BackgroundImage imgSrc={chococookie} title='MY PAGE'/>
      <MyPageEditMain>
        <MyPageEditImg>
          {myImg === null ? <img src={basicimg} alt='img' className='myimg'></img> :myImg.slice(0,4) === 'data' ? <img src={myImg}  alt="img" className='myimg'></img>: <img src={`${URI}/images/${myImg}`} alt="img" className='myimg'></img>}
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
            <input onChange={(e)=>setName(e.target.value)} value={name}></input>
          </MyPageEditName>
          <MyPageEditNickName>
            <div><span className='star'>*</span>NickName</div>
            <input onChange={(e)=>setNickName(e.target.value)} value={nickName}></input>
          </MyPageEditNickName>
          <MyPageGender>
            <div>Gender</div>
            <fieldset>
              <div>
                <input type='radio' value='male' id='male' name='gender' onClick={(e)=>setGender(e.target.value)} checked = {gender === 'male'? true: false}></input>
                <label htmlFor="male" > Male</label>
              </div>
              <div>
                <input type='radio' value='female' id='female' name='gender' onClick={(e)=>setGender(e.target.value)} checked = {gender === 'female'? true: false}></input>
                <label htmlFor="female"> Female</label>
              </div>
            </fieldset>
          </MyPageGender>
          <MyPageDateOfBirth>
            <div>Date Of Birth</div>
            <input type='date' max={now} onChange={(e)=>setBirth(e.target.value)} value={birth}></input>
          </MyPageDateOfBirth>
          <MyPageHomeAdress>
            <div>Home Adress</div>
            <input onChange={(e)=>setAddress(e.target.value)} value={address}></input>
          </MyPageHomeAdress>
          <MyPagePhoneNumber>
            <div>Tel</div>
            <input type='tel' onChange={(e)=>setphoneNumber(e.target.value)} value={phoneNumber}></input>
          </MyPagePhoneNumber>
          <MyPageEmail>
            <div><span className='star'>*</span>Email</div>
            <input className='emailfront' onChange={(e)=>setEmailFront(e.target.value)} value={emailFront}></input>
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
              <div className='passworddiv'><span className='star'>*</span>Password</div>
              <input type='password' onChange={(e)=>{
                setPassWord(e.target.value)
                setpassWordCheck(passwordform.test(e.target.value));
                console.log(passWordCheck,passWord,e.target.value)
                }}></input>
            </div>
            <div className='passwordcheck_logo'>{passWordCheck === undefined ? ' ' : passWordCheck ? '✅' : '❌' }
            <div className='passwordcheck'> The password must be at least 8 characters and include English, numbers, and special characters.</div>
            </div>
          </MyPagePassword>
          <MyPagePassWordDoubleCheck>
            <div><span className='star'>*</span>confirm password</div>
            <input type='password' onChange={(e)=>(setPassWordDoubleCheck(e.target.value))}></input>
            <div className='passworddoublecheck'>{passWordDoubleCheck === undefined ? ' ' : passWordDoubleCheck === passWord ? '✅ Your password matches' : '❌ Passwords do not match'}</div>
          </MyPagePassWordDoubleCheck>
        </div>
        <div className='what_wrong'>{wrong}</div>
        <MyPageSubmit onClick={submitsignup}>Save change</MyPageSubmit>
      </MyPageEditMain>
    </MyPageEditContainer>
  )
}