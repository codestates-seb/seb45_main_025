import { styled } from 'styled-components';

export const SignUpSelectContainer = styled.div`
  height: 120vh;
`;

export const SignUpSelectTop = styled.div`
  height: 30vh;
  width: 100vw;
  background-color: lightgray;

  > h1{
    text-align: center;
    display: block;
    font-size: 40px;
    color: white;
    padding-top: 50px;
  }
`

export const SignUpSelectMain = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;

  h2{
    padding-top: 50px;
    font-size: 30px;
  }
  h3{
    font-size: 25px;
    margin-top: 10vh;
    margin-right: auto;
    margin-left: 20vw;
  }
  .signup_select_main_container{
    width: 60vw;
    border: 0.3px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 10vh;
    padding-bottom: 10vh;
    margin-bottom: 20px;
  }
  .oauth_signup{
    display: flex;
    flex-direction: column;
  }
  .google_signup{
    width: 13vw;
    height: 75px;
    border: 0.3px solid black;
  }
  .facebook_signup{
    background-color: #485793;
    color: white;
    margin-top: 10px;
    width: 13vw;
    height: 75px;
    border: 0.3px solid black;
  }
  img{
    width: 15px;
    background-color: white;
  }
  .line{
    border-right: 0.5px black solid;
    width: 150px;
    height: 160px;
  }
  .rightline{
    width: 150px;
    height: 160px;
  }
  .sign_up{
    width: 13vw;
    height: 80px;
    border: 0.3px solid black;
  }
`