import { styled } from 'styled-components';

export const MainImageContainer = styled.div`
  background-image: ${props => props.backgroundImage};
  background-size: cover;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 3rem 6rem;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    letter-spacing: -5px;
  }

  p {
    color: white;
    font-size: 3.5rem;
  }

  strong {
    color: white;
    font-weight: 600;
    margin: 0;
    font-size: 3.5rem;
  }
`;