import { styled } from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-bottom: 8rem;
`;

export const OrderContainer = styled.div`
  width: 100%;
  padding: 5rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 40px;
    margin: 2rem 0 3rem 0;
  }
`;

export const FormContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  width: 70%;
  position: relative;

  .edit-button {
    position: absolute;
    top: 3%;
    /* left: 31%; */
    right: 4%;
    color: var(--gray-50);
    font-weight: 600;
  }

  .edit-button svg {
    width: 18px;

    path {
      stroke: var(--gray-50);
    }
  }
`;

export const FormTitle = styled.div`
  display: flex;
  color: var(--brown-10);
  font-size: 20px;
  padding-left: 2rem;
  letter-spacing: 2px;
`;

export const FormCotents = styled.div`
  border: 1px solid var(--gray-10);
  border-radius: 10px;
  padding: 2rem 3rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;

  div {
    font-size: 14px;
    color: var(--gray-50);
    margin: 0.4rem 0;
  }

  .info-title {
    font-weight: 600;
  }

  .info-contents {
    margin-left: 0.3rem;
  }

  label {
    font-size: 14px;
    color: var(--gray-50);
    font-weight: 600;
    margin: 0.5rem 0;
  }

  input {
    font-size: 13px;
    padding: 0.5rem;
    margin-left: 0.3rem;
    border: 1px solid var(--gray-10);
    border-radius: 5px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 68%;
  justify-content: flex-start;

  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1.5rem;
    font-size: 12px;
    font-weight: 200;
    margin: 0 0.3rem;

    &:hover {
      background-color: #f9f9f9;
      box-shadow: 4px 4px 4px #ddd;
    }

    &:active {
      box-shadow: inset 4px 4px 4px #ddd;
    }
  }
`
