import { styled } from 'styled-components';

export const SignUpSelectContainer = styled.div`
  height: 1500px;
`;


export const SignUpSelectMain = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem 0;
  h2{
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }
  h3{
    font-size: 25px;
    margin-right: auto;
    margin-left: 20vw;
    color: var(--gray-90);
    margin-bottom: 5px;
  }
  .signup_select_main_container{
    width: 60vw;
    border: 1px solid var(--brown-10);
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
    border: 1px solid var(--brown-10);
  }
  .facebook_signup{
    background-color: #485793;
    color: white;
    margin-top: 10px;
    width: 13vw;
    height: 75px;
    border: 1px solid var(--brown-10);
  }
  img{
    width: 15px;
    background-color: white;
  }
  .line{
    border-right: 1px solid var(--gray-10);
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
    border: 1px solid var(--brown-10);
  }
`