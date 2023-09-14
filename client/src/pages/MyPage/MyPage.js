import {
  MyPageContainer,
  MyPageMain, MyPageImg,
  ChangeAccountBtn, MyPageName,
  MyPageNickName, MyPageGender,
  MyPageBirth, MyPageAddress,
  MyPageTel, MyPageEmail
} from './MyPage.styled';
import { useState, useEffect } from "react";
import basicimg from '../../common/image/basicimg.png';
import edit from '../../common/image/edit.png';
import { Link,  } from "react-router-dom";
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import chococookie from '../../common/image/darkcookies.jpg';
import axios from "axios";
import getAccessToken from '../../common/utils/getToken';
// useNavigate
export default function MyPage() {
  const [myImg, setMyImg] = useState(null);
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('')
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [emailFront, setEmailFront] = useState('');
  const [emailBack, setEmailBack] = useState('');
  const URI = process.env.REACT_APP_API_URL;
  // const navigate = useNavigate();

  useEffect(() => {
    setMyImg(null);
    let access_token = getAccessToken();
    console.log(access_token);
    console.log(`${URI}/mypage`)
    axios.get(`${URI}/mypage`,{headers: {Authorization: access_token}})
    .then((res)=>{
      console.log(res);
      setName(res.data.name);
      setNickName(res.data.nickName)
      setGender(res.data.gender);
      setBirth(res.data.birth);
      setAddress(res.data.address);
      setphoneNumber(res.data.phone);
      let email = res.data.email.split('@');
      setEmailFront(email[0]);
      setEmailBack(email[1]);
    }).catch((res)=>{
      console.log(res);
      alert("check login")
    })
  },[]);
      // navigate('/')
  return (
    <MyPageContainer>
      <BackgroundImage imgSrc={chococookie} title='MY PAGE' />
      <MyPageMain>
        <MyPageImg>
          {myImg === null ? <img src={basicimg} alt='img' className='myimg'></img> : <img src={myImg} alt="img" className='myimg'></img>}
        </MyPageImg>
        <div className='mypageetc'>
          <Link to='edit'>
            <ChangeAccountBtn>
              <img src={edit} alt='edit' />
              <p>Edit Account</p>
            </ChangeAccountBtn>
          </Link>
          <MyPageName>
            <div>Name</div>
            <div>{name}</div>
          </MyPageName>
          <MyPageNickName>
            <div>Nick Name</div>
            <div>{nickName}</div>
          </MyPageNickName>
          <MyPageGender>
            <div>Gender</div>
            <div>{gender}</div>
          </MyPageGender>
          <MyPageBirth>
            <div>Birth</div>
            <div>{birth}</div>
          </MyPageBirth>
          <MyPageAddress>
            <div>Address</div>
            <div>{address}</div>
          </MyPageAddress>
          <MyPageTel>
            <div>Tel</div>
            <div>{phoneNumber}</div>
          </MyPageTel>
          <MyPageEmail>
            <div>Email</div>
            <div>{emailFront}@{emailBack}</div>
          </MyPageEmail>
        </div>
      </MyPageMain>
    </MyPageContainer>
  )
}