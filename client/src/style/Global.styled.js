import { styled, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --main-width: 1024px;
    --brown-50: #2b2821;
    --brown-10: #bd8961;
    --brown-20: #b39076;
    --brown-30: #f7f2e0;
    --white: #ffffff;
    --black: #000000;
    --black-10: #0000001a;
    --black-50: #0000005a;
    --gray: #888888;
    --gray-10 : #D9D9D9;
    --gray-30: #A8A8A8;
    --gray-50: #666666;
    --gray-90: #2B2821;
    --red-90: #D94F4F;
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
      font-size: 16px;
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

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const Tab = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--brown-10);
  > li {
    width: 128px;
    height: 2.2rem;
    line-height: 36px;
    text-align: center;
    font-weight: 600;
    background-color: var(--brown-30);
    color: var(white);
    cursor: pointer;
    &:nth-of-type(1) {
      border-radius: 6px 0 0 6px;
      border-right: 1px solid #fff;
    }
    &:nth-of-type(2) {
      border-radius: 0 6px 6px 0;
    }
    &.active {
      background-color: var(--brown-50);
      color: #fff;
    }
    @media (max-width: 768px) {
      width: 50%;
    }
  }
`;