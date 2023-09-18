import { styled } from 'styled-components';

export const CartListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;

  .subtotal-price {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 24px;
    color: var(--brown-10);
    font-weight: 600;
  }

  .subtotal-price span {
    font-weight: 200;
    padding-right: 8px;
    padding-bottom: 3px;
    font-size: 18px;
    color: var(--gray-90);
  }
`;

export const CartTable = styled.div`
  border-collapse: collapse;
  border: 1px solid var(--brown-10);
  border-radius: 5px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  thead, tbody {
    width: 100%;
    flex-grow: 1;
    font-size: 16px;
  }

  tr {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  th, td {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 3rem;
    text-align: center;
    width: 18%;
    border-bottom: 1px solid #ddd;
    flex-grow: 1;
    font-weight: 200;
  }

  th {
    border-bottom: 1px solid var(--brown-10);
    color: var(--gray-90);
    font-weight: 500;
    font-size: 1rem;
  }

  img {
    width: 2.5rem;
    height: 3.5rem;
    margin: 0 1rem;
  }

  th:first-child, td:first-child {
    width: 1%;
  }

  th:nth-child(2), td:nth-child(2) {
    width: 30%;
    padding-left: 3rem;
  }

  .name {
    justify-content: flex-start;
  }

  .quantity {
    input {
      width: 3rem;
      text-align: center;
    }
  }

  .empty {
    height: 30vh;
    font-size: 26px;
    font-weight: 600;
  }

  .checkbox-container {
    padding: 15px;
  }

  input[type=checkbox] {
    cursor: pointer;
    accent-color: #a1856f;
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 200;
    margin: 0 0.2rem;
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
`

export const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0.5rem;
  margin-right: 7%;
`;