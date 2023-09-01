import { styled } from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export const OrderContainer = styled.div`
  width: 100%;
  /* height: 100vh; */
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }

  button {
    border: 1px solid var(--gray-10);
    border-radius: 4px;
    padding: 0.3rem 1rem;
    margin: 1rem;
  }
`;

export const FormContainer = styled.div`
  width: 70%;
  border: 1px solid var(--gray-10);
  border-radius: 4px;
  padding: 2rem;
  margin: 1rem;
`;
