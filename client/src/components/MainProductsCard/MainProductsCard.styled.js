import { styled } from 'styled-components';

export const MainProductsCardContainer = styled.div`
  position: relative;
  background-color: var(--black);
  color: var(--white);
  margin: 0 0.3rem;

  img {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
  }

  .product-type {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0;
    margin: 0;
    height: 14%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.3rem;
    padding-right: 1.5rem;
  }

  span {
    margin: 0 0.2rem 0.7rem 0.2rem;
    color: white;
    font-size: 2.5rem;
  }

  &:hover {
    .product-type {
      color: var(--brown-50);
      background-color: rgba(232, 231, 227, 0.8);
      font-size: 1.4rem;
      font-weight: 600;
      padding-right: 1.6rem;

      span {
        color: var(--brown-50);
        font-weight: 600;
      }
    }
  }
`;