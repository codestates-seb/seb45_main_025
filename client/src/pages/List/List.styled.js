import styled from "styled-components";
import Snack1 from "../../common/image/snacks1.webp"

export const LogContainer = styled.div`
  position: relative;
`;

export const TopContainer = styled.div`
  position: relative;  
  width: 100vw;
  height: 400px;
  background-image: url(${Snack1});
  background-size: cover;
  background-position: 25% 60%;

  > .top__container {
    position: absolute;
    display: flex;
    width: 100vw;
    align-items: flex-end;
    height: 400px;

    > .top__content {
      position: relative;
      margin: 0px auto;
      padding: 50px;
      padding-left: 650px;
      width: 100%;
      min-width: 1024px;
      max-width: 1920px;
    }
  }

  h1 {
    margin-bottom: var(--spacing-4);
    font-size: 50px;
    line-height: var(--xx-large-heading-line-height);
    font-weight: 500;
    color: var(--white);
  }
`;

export const MainContainer = styled.div`
  position: relative;
  margin: 50px;

  > .main__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4);

    .selection__tab {
      margin-left: 60%;

      > .mode--button {
        padding: 10px 14px;
        font-weight: 500;
        background-color: transparent;
        border-radius: 3px;
        font-weight: 400;
        margin: 0 5px;
        border: 1px solid var(--light-gray-5);
      }

      > .mode--selected {
        background-color: var(--primary-blue-light-2);
        color: var(--dark-gray-1);
      }
    }
  }

  h2 {
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

  .button--top {
    position: fixed;
    color: white;
    bottom: 50px;
    right: 50px;
    padding: 0;
    width: var(--spacing-5);
    height: var(--spacing-5);
    border-radius: 50%;
    background-color: transparent;
    font-weight: 500;
    transition: all 0.2s ease-in;
  }
`;