import { styled, keyframes } from 'styled-components';

export const btnTop = keyframes`
  0% {transform: sclae(1);}
  25% {transform: sclae(0.8);}
  50% {transform: sclae(1.1);}
  75% {transform: sclae(0,8);}
  100% {transform: sclae(1);}
`;

export const Container = styled.div`
  width: 100%;
  /* height: 30vh; */
  background-color: var(--brown-10);
  bottom: 0;
  @media screen and (max-width: var(--main-width)) {
    display: none;
  }
  padding: 3rem 12rem 2rem 4rem;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
    height: 100%;
    .logo {
      img {
        width: 10rem;
      }
    }
    .github {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      font-size: 0.7rem;
    }
  }

  .developers {
    color: var(--brown-50);
    font-weight: 600;
    font-size: 2.3rem;
  }
`;

export const Logo = styled.img``;

export const GithubContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  margin-right: 2.5rem;

  img {
    width: 2rem;
    border-radius: 100%;
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--brown-50);
    font-weight: 600;
    svg {
      path {
        fill: var(--brown-50);
      }
    }
  }

  a:hover {
    color: var(--gray-10);
      svg {
        path {
          fill: var(--gray-10);
        }
      }
  }

  .git-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1.6rem;
  }
`;

export const PageTop = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  color: #f3c4d9;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .3) !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  text-align: center;
  line-height: 60px;
  font: 1rem;
  text-transform: lowercase;
  transition: all .8s;

  &:hover {
    animation: btnTop 3s infinite;
    color: #fff;
    background: #a6d4e8;
  }
`;
