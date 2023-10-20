import { styled } from 'styled-components';

export const OrderPageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 8rem;
  width: 100vw;
`;

export const OrderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 0 2rem 0;
  width: 100%;

  .title {
    color: var(--gray-90);
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 5px;
    margin: 2rem 0 3rem 0;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  position: relative;
  width: 100%;

  .edit-button {
    color: var(--gray-50);
    font-weight: 600;
    position: absolute;
    right: 4%;
    top: 3%;
  }

  .edit-button svg {
    width: 18px;

    path {
      stroke: var(--gray-50);
    }
  }
`;

export const FormTitle = styled.div`
  color: var(--brown-10);
  display: flex;
  font-size: 20px;
  letter-spacing: 2px;
  padding-left: 2rem;
`;

export const FormCotents = styled.div`
  border: 1px solid var(--gray-10);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 2rem 3rem;

  div {
    color: var(--gray-50);
    font-size: 1rem;
  }

  img {
    height: 3.5rem;
    margin-right: 1.2rem;
    width: 2rem;
  }

  input {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    font-size: 0.9rem;
    margin: 0.2rem 0 0.7rem 0.3rem;
    padding: 0.5rem;
  }

  label {
    color: var(--gray-50);
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0;

    .guide-msg {
      align-items: center;
      color: var(--red-90);
      display: flex;
      font-size: 0.8rem;
      font-weight: 400;
    }

    svg {
      margin: 0 0.6rem;
    }
  }

  .info-contents {
    margin: 0.2rem 0.3rem 0.8rem 0.5rem;
  }

  .info-title {
    font-weight: 600;
  }

  .order-list-container {
    max-height: 15.5rem;
    overflow-y: scroll;
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
        color: var(--gray-30);
        font-size: 0.85rem;
        margin: 0 0.3rem;
        margin-bottom: 0.5rem;
      }
      
      .product-name,
      .total-price {
        color: var(--gray-50);
        display: flex;
        font-size: 1rem;
        font-weight: 600;
        justify-content: flex-start;
        margin-bottom: 0.3rem;
      } 
    } 
  }

  .subtotal-price {
    border-top: 1px solid var(--gray-10);
    color: var(--brown-10);
    display: flex;
    font-size: 1rem;
    justify-content: flex-end;
    margin-top: 1.3rem;
    padding-top: 0.7rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem 0 0 0;
  width: 100%;

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    font-size: 12px;
    font-weight: 200;
    padding: 0.5rem 1rem;
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
    background-color: #b39076;
    border: none;
    color: var(--white);
    padding: 0.5rem 2rem;

    &:hover {
      background-color: var(--brown-20);
      box-shadow: 4px 4px 4px #d4c9c1;
    }

    &:active {
      box-shadow: inset 4px 4px 4px #7a451c;
    }
  }
`

export const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 80%;
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
  transition: all 0s;
  width: ${(props) => props.className === 'fixed' ? '28%' : '35%'};
`;