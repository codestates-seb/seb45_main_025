import { styled } from 'styled-components';

export const OrderSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  text-align: center;

  
  h1 {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 5rem 0;
  }

  div {
    margin: 0.3rem 0;
  }

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 200;
    margin: 4rem 0.3rem;
  }

  button:hover {
    background-color: #f9f9f9;
    box-shadow: 4px 4px 4px #ddd;
  }

  button:active {
    box-shadow: inset 4px 4px 4px #ddd;
  }

  .flex-row {
    width: 57%;
    display: flex;
    flex-direction: row;
  }

  .space-between {
    justify-content: space-between;
  }

  .title {
    display: flex;
    color: var(--brown-10);
    font-size: 20px;
    padding-left: 2rem;
    letter-spacing: 2px;
  }

  .font-light {
    font-weight: 300;
    font-size: 0.9rem;
  }
`;

export const OrderInfoContainer = styled.div`
  width: 60%;
  border: 1px solid var(--gray-10);
  border-radius: 5px;
  padding: 1rem 2rem;

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: space-between; */
  }

  .info-title {
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    color: var(--gray-50);
    font-weight: 600;
    padding: 0.5rem 0;
    width: 11rem;
  }

  .info-content {
    width: 5rem;
    font-size: 1.1rem;
    font-weight: 200;
  }
`;