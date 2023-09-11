import { styled } from 'styled-components';

export const OrderCheckoutContainer = styled.div`
  padding: 12rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 2.1rem;
    font-weight: 600;
    margin: 2rem;
  }

  input[type='checkbox'] {
    margin: 0.3rem;
  }
`;