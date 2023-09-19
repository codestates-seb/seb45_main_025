import { styled, css } from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  z-index: 5;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.3);

  &.home {
    background-color: rgba(0, 0, 0, 0);
    ${({ scrolled }) => scrolled && css`
    background-color: var(--white);
    padding: 0.5rem 2rem;
    margin: 0;
  `}
  }

  ${({ scrolled }) => scrolled && css`
    background-color: var(--white);
    padding: 0.5rem 2rem;
    margin: 0;
    border-bottom: 1px solid #ebebeb;
  `}
`;

export const LeftNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  padding: 0 1.5rem;

  a {
    margin: 0 0.5rem;
    color: var(--white);
    font-size: 1.2rem;

    ${({ scrolled }) => scrolled && css`
      color: var(--brown-50);
    `}
  }
`;

export const RightNavContainer = styled.div`
  padding: 0 1.5rem;

  div {
    display: flex;
    flex-direction: row;
  }

  a {
    margin: 0 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--white);

    svg {
      margin: 0.2rem 0.3rem;

      path {
        fill: var(--white);

        ${({ scrolled }) => scrolled && css`
          fill: var(--brown-50);
        `}
      }
    }

    button {
      display: flex;
      color: var(--white);
      ${({ scrolled }) => scrolled && css`
        color: var(--brown-50);
      `}
    }

    ${({ scrolled }) => scrolled && css`
      color: var(--brown-50);
    `}
  }
`

export const HeaderWrap = styled.div`
display: flex;
justify-content: space - between;
align-items: center;
max-width: var(--main-width);
width: 100%;
`;

export const HeaderLogo = styled.img`
margin: 10px;
width: 150px;

  ${({ scrolled }) => scrolled && css`
    width: 100px;
  `}
`;