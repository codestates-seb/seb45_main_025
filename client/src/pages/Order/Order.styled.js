import { styled } from 'styled-components';

export const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-bottom: 8rem;
`;

export const OrderContainer = styled.div`
  width: 100%;
  padding: 5rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 2.5rem;
    margin: 2rem 0 3rem 0;
  }
`;

export const FormContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  .edit-button {
    position: absolute;
    top: 3%;
    /* left: 31%; */
    right: 4%;
    color: var(--gray-50);
    font-weight: 600;
  }

  .edit-button svg {
    width: 18px;

    path {
      stroke: var(--gray-50);
    }
  }
`;

export const FormTitle = styled.div`
  display: flex;
  color: var(--brown-10);
  font-size: 20px;
  padding-left: 2rem;
  letter-spacing: 2px;
`;

export const FormCotents = styled.div`
  border: 1px solid var(--gray-10);
  border-radius: 10px;
  padding: 2rem 3rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;

  div {
    font-size: 1rem;
    color: var(--gray-50);
  }

  .info-title {
    font-weight: 600;
  }

  .info-contents {
    margin: 0.2rem 0.3rem 0.8rem 0.5rem;
  }

  label {
    font-size: 1rem;
    color: var(--gray-50);
    font-weight: 600;
    margin: 0.5rem 0;

    .guide-msg {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      font-weight: 400;
      color: var(--red-90);
    }

    svg {
      margin: 0 0.6rem;
    }
  }

  input {
    font-size: 0.9rem;
    padding: 0.5rem;
    margin: 0.2rem 0 0.7rem 0.3rem;
    border: 1px solid var(--gray-10);
    border-radius: 5px;
  }

  img {
    width: 2.3rem;
    height: 3rem;
    margin-right: 1rem;
  }

  .order-list {
    display: flex;
    flex-direction: row;
    padding: 0.4rem 0;

    .flex-grow {
      flex-grow: 1;
    }

    div .flex-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      div {
        font-size: 0.85rem;
        margin: 0 0.3rem;
        margin-bottom: 0.5rem;
        color: var(--gray-30);
      }
      
      .product-name,
      .total-price {
        display: flex;
        justify-content: flex-start;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 0.3rem;
        color: var(--gray-50);
      } 
    } 
  }

  .subtotal-price {
      margin-top: 1.3rem;
      border-top: 1px solid var(--gray-10);
      padding-top: 0.7rem;
      display: flex;
      justify-content: flex-end;
      color: var(--brown-10);
      font-size: 1rem;
    }
`;

export const ButtonContainer = styled.div`
  padding: 2rem 0 0 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 12px;
    font-weight: 200;
    margin: 0 0.3rem;

    &:hover {
      background-color: #f9f9f9;
      box-shadow: 4px 4px 4px #ddd;
    }

    &:active {
      box-shadow: inset 4px 4px 4px #ddd;
    }
  }

  .order-btn {
    color: var(--white);
    background-color: var(--brown-10);
    background-color: #b39076;
    padding: 0.5rem 2rem;
    border: none;

    &:hover {
      background-color: var(--brown-20);
      box-shadow: 4px 4px 4px #d4c9c1;
    }

    &:active {
      box-shadow: inset 4px 4px 4px #7a451c;
    }

    /* &:disabled {
      cursor: default;
      background-color: #ccc1b8;
      background-color: #ddd;
      color: #ddd;
      border: 1px solid var(--gray-10);
      box-shadow: none;
    } */
  }
`

export const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 80%;
  justify-content: space-between;
`;

export const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

export const RightBox = styled.div`
  position: ${(props) => (props.className === 'fixed' ? 'fixed' : 'absolute')};
  right: ${(props) => (props.className === 'fixed' ? '10%' : '0')};
  top: ${(props) => (props.className === 'fixed' ? '14.5%' : '')};
  width: ${(props) => props.className === 'fixed' ? '28%' : '35%'};
  transition: all 0s;
`;