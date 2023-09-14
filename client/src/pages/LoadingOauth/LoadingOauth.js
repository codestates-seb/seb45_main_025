import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OauthLoading(){
  let pageparam = useLocation();
  const navigate = useNavigate();
  let pageparam_split =  pageparam.split()
  localStorage.setItem('access_token',pageparam_split)
  localStorage.setItem('refresh_token',pageparam_split)
  useEffect(() => {
    navigate('/signup/oauth')
  },[])
  return (<></>)
}