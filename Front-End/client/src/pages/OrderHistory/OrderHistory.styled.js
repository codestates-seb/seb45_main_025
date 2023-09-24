import { styled } from 'styled-components';

export const OrderHistoryPageContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderHistoryContainer = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 0rem 0;
  }

  .incomplete-container {
    margin: 3rem 0 5rem 0;
  }

  .incomplete {
    margin: 1.2rem 0;
    text-align: center;
    font-size: 1.7rem;
    color: var(--brown-10);
  }

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 200;
    margin: 0 0.2rem;
    margin-bottom: 3rem;
  }

  button:disabled {
    color: #ddd;
    cursor: default;
  }

  button:not(:disabled):hover {
    background-color: #f9f9f9;
    box-shadow: 4px 4px 4px #ddd;
  }

  button:not(:disabled):active {
    box-shadow: inset 4px 4px 4px #ddd;
  }
`;

export const OrderCard = styled.div`
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
`;

export const OrderItem = styled.div`

`;