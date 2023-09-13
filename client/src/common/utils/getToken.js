//엑세스 토큰으로 정보를 가져오는 상황에서 정보를 가져오는 것을 실패하였다면 리프레쉬토큰으로 엑세스 토큰을 새로 발급 받아서 데이터를 받아온다
// import axios from "axios";
// import jwt_decode from "jwt-decode";

export default function getAccessToken(){
  // let cookiedata = document.cookie;
  // let access_token = cookiedata.indexOf(`access_token=`);
  // let refresh_token = cookiedata.indexOf(`refresh_token=`);
  // access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjoxLCJzdWIiOiJhekBnbWFpbC5jb20iLCJpYXQiOjE2OTQ1MzAzNDksImV4cCI6MTY5NDUzMjE0OX0.Df1yyvqZxss-y5jBwkbTCelZtFqJ_La-c9Y-fzy8ApA';
  // let access_token_decoded = jwt_decode(access_token);
  // let exp = new Date(access_token_decoded.exp * 1000);
  // let now = new Date();
  // console.log(exp,now)
  // if(access_token !== undefined && refresh_token !== undefined){
  //   return false
  // }else{
    // let access_token_decoded = jwt_decode(access_token);
    // let exp = new Date(access_token_decoded.exp * 1000);
    // let now = new Date();
  //   if(exp > now){
  //     console.log(`Bearer ${access_token_decoded}`)
  //     return `Bearer ${access_token_decoded}`
  //   }else{
  //     const URI = process.env.REACT_APP_API_URL;
  //     axios.get(`${URI}/`)
  //     .then((res)=>{
  //       return res
  //     })
  //     .catch((res)=>console.log(res))
  //   }
  // }   

let access_token = localStorage.getItem('access_token');
return access_token;
}