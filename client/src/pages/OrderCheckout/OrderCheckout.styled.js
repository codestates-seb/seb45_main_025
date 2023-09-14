import { styled } from 'styled-components';

export const OrderCheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  padding-bottom: 8rem;
  justify-content: center;
  text-align: center;

  h1 {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 0 0;
  }

  span {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--gray-90);
  }

  label {
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
    margin: 1rem 0;
    font-weight: 300;
    cursor: pointer;
  }

  input[type='checkbox'] {
    margin: 0.3rem;
  }

  button {
    border: 1px solid var(--gray-10);
    padding: 0.9rem 1rem;
    border-radius: 5px;
    margin: 1.5rem;

    &:hover {
      background-color: #f9f9f9;
      box-shadow: 4px 4px 4px #ddd;
    }

    &:active {
      box-shadow: inset 4px 4px 4px #ddd;
    }
  }

  .alert {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: var(--brown-20);
    margin: 1.5rem;
    
    svg {
      margin: 0 0.6rem;

      path {
        fill: var(--brown-10);
      }
    }
  }
`;