import { styled } from 'styled-components';

export const OrderFailContainer = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 5rem 0 5rem 0;
  height: 92vh;

  h1 {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }

  div {
    font-size: 1.3rem;
    color: var(--brown-10);
  }

  svg {
    path {
      fill: var(--brown-10);
    }
  }

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 200;
    margin-top: 5rem;
  }

  button:hover {
    background-color: #f9f9f9;
    box-shadow: 4px 4px 4px #ddd;
  }

  button:active {
    box-shadow: inset 4px 4px 4px #ddd;
  }
`;