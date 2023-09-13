import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 15vh;
  background-color: var(--brown-10);
  bottom: 0;
  @media screen and (max-width: var(--main-width)) {
    display: none;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    .logo {
      img {
        width: 10rem;
      }
    }
    .github {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.7rem;
    }
  }
`;

export const Logo = styled.img``;

export const GithubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
  img {
    width: 4rem;
    border-radius: 100%;
    margin-bottom: 0.5rem;
  }
`;
