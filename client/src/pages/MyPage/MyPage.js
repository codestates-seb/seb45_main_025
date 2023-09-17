import {
  MyPageContainer,
  MyPageMain, MyPageImg,
  ChangeAccountBtn, MyPageName,
  MyPageNickName, MyPageGender,
  MyPageBirth, MyPageAddress,
  MyPageTel, MyPageEmail, 
  MyOrder, MyWriting
} from './MyPage.styled';
import { useState, useEffect } from "react";
import basicimg from '../../common/image/basicimg.png';
import edit from '../../common/image/edit.png';
import { useNavigate } from "react-router-dom";
import lightcart from "../../common/image/lightcart.png";
import communities from '../../common/image/writing.png'
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
  const navigate = useNavigate();

  useEffect(() => {
    let access_token = getAccessToken();
    console.log(access_token);
    console.log(`${URI}/mypage`)
    axios.get(`${URI}/mypage`,{headers: {Authorization: access_token}})
    .then((res)=>{
      console.log(res);
      setMyImg(res.data.saveFileName)
      console.log(res.data.saveFileName);
      setName(res.data.name);
      setNickName(res.data.nickName)
      setGender(res.data.gender);
      setBirth(res.data.birth);
      setAddress(res.data.address);
      setphoneNumber(res.data.phone);
      let email = res.data.email.split('@');
      setEmailFront(email[0]);
      setEmailBack(email[1]);
      console.log(`${URI}/images/${myImg}`)
    }).catch((res)=>{
      console.log(res);
      alert("check login");
      navigate('/');
    })
  },[]);
      

  function mypageedit(){
    let access_token = getAccessToken();
    console.log(access_token)
    axios.get(`${URI}/mypage`,{headers: {Authorization: access_token}})
    .then((res)=>{
      console.log(res)
      if (res.data.oauth === false){
        navigate('/mypage/edit')
      }else if(res.data.oauth === true){
        navigate('/mypage/editoauth')
      }
    })
    .catch((res)=>console.log(res))
  }
  return (
    <MyPageContainer>
      <BackgroundImage imgSrc={chococookie} title='MY PAGE' />
      <MyPageMain>
        <div className='mypagebtns'>
          <MyOrder onClick={()=>navigate('/order-history')}>
            <img src={lightcart} alt='myorder' />
            <p>My order</p>
          </MyOrder>
          <MyWriting onClick={()=>navigate('/mywriting')}>
            <img src={communities} alt='mywriting' />
            <p>My writing</p>
          </MyWriting>
          <ChangeAccountBtn onClick={mypageedit}>
            <img src={edit} alt='edit' />
            <p>Edit Account</p>
          </ChangeAccountBtn></div>
        <MyPageImg>
          {myImg === null ? <img src={basicimg} alt='img' className='myimg'></img> : <img src={`${URI}/images/${myImg}`}  alt="img" className='myimg'></img>}
        </MyPageImg>
        <div className='mypageetc'>
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