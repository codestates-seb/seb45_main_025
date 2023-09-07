//엑세스 토큰으로 정보를 가져오는 상황에서 정보를 가져오는 것을 실패하였다면 리프레쉬토큰으로 엑세스 토큰을 새로 발급 받아서 데이터를 받아온다
import axios from "axios";

export default function getAccessToken(){
  let cookiedata = document.cookie;
  let accesstoken = cookiedata.indexOf(`access_token=`);
  let refreshtoken = cookiedata.indexOf(`refresh_token=`);
  console.log(accesstoken,refreshtoken)
  if(!accesstoken && !refreshtoken){
    return false
  }else if(!accesstoken){
    //리프레쉬 토큰을 보내면 엑세스 토큰을 받아오는 상황, 그후 엑세스 토큰과 리프레쉬 토큰 재설정
    axios.post('/token/refresh')
    return accesstoken
  }else{
    return accesstoken
  }
}
