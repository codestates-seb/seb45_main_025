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
    padding: 1.3rem 5rem;
    font-size: 23px;
    color: var(--brown-50);
    font-weight: 600;
  }

  .subtotal-price span {
    font-weight: 400;
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
  }

  th {
    border-bottom: 1px solid var(--brown-10);
  }

  img {
    max-width: 80px;
    max-height: 90px;
    margin: 0 1rem;
  }

  th:first-child, td:first-child {
    width: 5%;
  }

  th:nth-child(2), td:nth-child(2) {
    width: 35%;
  }

  .name {
    justify-content: flex-start;
  }

  .empty {
    height: 30vh;
    font-size: 26px;
    font-weight: 600;
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
    font-size: 14px;
    font-weight: 200;
    margin: 1.5rem 0.3rem;

    &:hover {
      background-color: #f9f9f9;
      box-shadow: 4px 4px 4px #ddd;
    }

    &:active {
      box-shadow: inset 4px 4px 4px #ddd;
    }
  }
`