import {MyWritingContainer,MyWritingEmpty,
  MyWritingEle,MyWritingMain}
  from './MyWriting.styled'
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import chococookie from '../../common/image/darkcookies.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';
import { Link } from "react-router-dom";
import emptysnack from '../../common/image/emptysnack.png'
export default function MyWriting(){
  const URI = process.env.REACT_APP_API_URL;
  const [myWrite, setMyWrite] = useState([])
  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    let access_token = getAccessToken();
    axios.get(`${URI}/mypage/board`,{headers: {Authorization: access_token}})
    .then((res)=>{
      setMyWrite(res.data)
      console.log(res.data)
    });
  },[]);
  
  return(
    <MyWritingContainer>
      <BackgroundImage imgSrc={chococookie} title='MY PAGE' />
      <MyWritingMain>
      <h2>My Post</h2>
        {myWrite.length === 0 ?<MyWritingEmpty><img src={emptysnack} alt="empty"/>You have not posted a post<br/><Link to='/CommunityList'>click</Link> to start a post</MyWritingEmpty> 
        : myWrite.map((ele)=><MyWritingEle key={ele.boardId}>
        <div className='mywritingtop'>
          <Link to={`/CommunityBoard/${ele.boardId}`}>{ele.title}</Link>
          <div className='mywritimglittle'>
            <p>createdAt | {ele.createAt.split('T')[0]} </p>
            <p>view | {ele.view} </p>
          </div>
        </div>
        <p>{htmlToText(ele.content)}</p>
      </MyWritingEle>)}
      </MyWritingMain>
    </MyWritingContainer>
  )
}