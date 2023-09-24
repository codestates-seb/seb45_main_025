import { styled } from 'styled-components';

export const BackgroundImageContainer = styled.div`
  width: 100vw;
  height: 25rem;
  background-image: ${({ backgroundImage }) => backgroundImage};
  background-size: cover;
  background-position: center 20%;

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  font-weight: 600;
  letter-spacing: 3px;
  padding-top: 3rem;
`;