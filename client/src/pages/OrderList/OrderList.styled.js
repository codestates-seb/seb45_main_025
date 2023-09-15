import { styled } from 'styled-components';

export const OrderListPageContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderListContainer = styled.div`
  height: 100vh;
  padding: 5rem;
  
  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 3rem 0;
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