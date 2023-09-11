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
import { Link } from "react-router-dom";
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import chococookie from '../../common/image/darkcookies.jpg';
import axios from "axios";
import getAccessToken from '../../common/utils/getToken';

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

  useEffect(() => {
    setMyImg(null);
    setName('유주성');
    setNickName('거인')
    setGender('male');
    setBirth('1999-04-21');
    setAddress('1101 Williams St, College Station, TX 77840, United States');
    setphoneNumber('+19797645565');
    setEmailFront('juseongyu56');
    setEmailBack('gmail.com');
    axios.get(`${URI}/users`, { headers: { Authorization: getAccessToken() } })
      .then((res) => {
        console.log(res);
        setName(res.name);
        setNickName(res.nickname)
        setGender(res.gender);
        setBirth(res.birth);
        setAddress(res.address);
        setphoneNumber(res.tel);
        setEmailFront(res.emailfront);
        setEmailBack(res.emailBack);
      }).catch((res) => { console.log(res) })
  });

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