import { styled } from 'styled-components';

export const ItemCardContainer = styled.div`
  img {
    width: 12rem;
    height: 16rem; 
  }

  .product-info {
    margin: 0.3rem;
  }

  .product-title {
    font-weight: 600;
    color: var(--gray-90);
    font-size: 1.2rem;
  }

  .product-price {
    color: var(--brown-10);
  }

  .flex-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .like {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      margin: 0.2rem 0.4rem 0 0;
      padding: 0;
    }
  }
`;