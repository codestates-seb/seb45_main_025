import { styled } from 'styled-components';

export const MainProductsContainer = styled.div`
  width: 100vw;
  height: 93vh;
  background-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  padding: 5rem 0 0 0;

  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 5rem;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 60vh;
  width: 100vw;
`;