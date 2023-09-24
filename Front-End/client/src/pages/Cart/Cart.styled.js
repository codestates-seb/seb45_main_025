import { styled } from 'styled-components';

export const CartPageContainer = styled.div`
  width: 100vw;

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 0;
  }

  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }
`;