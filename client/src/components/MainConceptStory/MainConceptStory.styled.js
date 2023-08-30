import { styled } from 'styled-components';

export const MainConceptStoryContainer = styled.div`
  width: 100vw;
  height: 95vh;
  background-color: #e8e7e3;
  color: #fff;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  padding: 5rem;

  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 1rem 0 2rem 0;
  }

  .title-description {
    color: var(--gray-50);
    font-size: 17px;
    font-weight: 900;
  }

  .content-title {
    font-size: 40px;
    margin: 2rem 0 0 0;
    color: var(--gray-90);
    font-weight: 700;
  }

  .content-tags span {
    color: #9b7b51;
    font-size: 20px;
    margin: 0 0.2rem;
  }

  .content-description {
    color: var(--gray-90);
    font-size: 26px;
    margin: 1rem 0;
  }

  .button-container {
    margin: 4rem 0 0 0;
  }

  button {
    background-color: var(--gray-90);
    color: var(--white);
    font-size: 4rem;
    font-weight: 100;
    padding: 0 2rem 1rem 2rem;
    margin: 1rem;
  }

  .show {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .hidden {
    opacity: 0;
    transition: opacity 0.5s ease-in;  
  }
`;

export const ImageContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 50%;

  img {
    height: 100%;
    width: 100%;
  }

  .show {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .hidden {
    opacity: 0.5;
    transition: opacity 0.5s ease-in;  
  }
`;