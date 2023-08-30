import { styled, createGlobalStyle } from 'styled-components';

export const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const BaseWrap = styled.div`
  max-width: var(--main-width);
  min-height: calc(100vh - 382px);
  width: 100%;
`;

export const GlobalStyle = createGlobalStyle`
 :root {
    --main-width: 1920px;
    --brown-50: #2b2821;
    --brown-10: #bd8961;
    --white: #ffffff;
    --black: #000000;
    --black-10: #0000001a;
    --black-50: #0000005a;
    --gray: #888888;
    --gray-10 : #D9D9D9;
    --gray-50: #666666;
    --gray-90: #2B2821;
  }

  * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font: inherit;
      font-family: 'Noto Sans KR', 'Roboto', sans-serif;
      vertical-align: baseline;
      text-decoration: none;
      color: var(--black);
      transition: 0.3s ease all;
    }

  body {
    min-height : 100vh;
    width: 100vw;
    overflow-x: hidden;
  }

  ol, ul {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
  }
`;
