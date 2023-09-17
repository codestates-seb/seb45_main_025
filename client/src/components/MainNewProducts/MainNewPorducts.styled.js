import { styled } from 'styled-components';

export const MainNewProductsContainer = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 0;

  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin-bottom: 4rem;
    padding-left: 2rem;
  }

  .flex-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem 15rem;
  }
`;