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
    --main-width: 1024px;
    --brown-50: #2b2821;
    --brown-10: #bd8961;
    --brown-20: #ab7952;
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

export const Tab = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  border-bottom: 2px solid var(--mainbl);
  > li {
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: 600;
    background-color: var(--bl-1);
    color: var(--bl-2);
    cursor: pointer;
    &:nth-of-type(1) {
      border-radius: 6px 0 0 6px;
      border-right: 1px solid #fff;
    }
    &:nth-of-type(2) {
      border-radius: 0 6px 6px 0;
    }
    &.active {
      background-color: brown;
      color: #fff;
    }
    @media (max-width: 768px) {
      width: 50%;
    }
  }
`;