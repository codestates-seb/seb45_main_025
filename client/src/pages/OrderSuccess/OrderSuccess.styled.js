import { styled } from 'styled-components';

export const OrderSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
  text-align: center;

  
  h1 {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }

  div {
    margin: 0.3rem 0;
  }

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 200;
    margin: 4rem 0.3rem;
  }

  button:hover {
    background-color: #f9f9f9;
    box-shadow: 4px 4px 4px #ddd;
  }

  button:active {
    box-shadow: inset 4px 4px 4px #ddd;
  }
`;