import { styled } from 'styled-components';

export const OrderCheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  justify-content: center;
  text-align: center;

  h1 {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }

  input[type='checkbox'] {
    margin: 0.3rem;
  }
`;