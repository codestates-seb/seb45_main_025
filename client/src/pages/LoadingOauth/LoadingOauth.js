import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OauthLoading(){
  let pageparam = useLocation();
  const navigate = useNavigate();
  let pageparam_split =  pageparam.split(/[?&=]/);
  console.log(pageparam_split);
  let access_token = `Bearer ${pageparam_split[2].slice(9)}`;
  let refresh_token = `Bearer ${pageparam_split[4]}`;
  localStorage.setItem('access_token',access_token);
  localStorage.setItem('refresh_token',refresh_token);
  if (pageparam_split[6] === 'true'){
    navigate('/signup/oauth')
  }else{
    navigate('/')
  }
  useEffect(() => {
  },[])
  return (<></>)
}