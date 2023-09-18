import { styled } from 'styled-components';

export const WriteCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  textarea {
    width: 400;
    height: 200px;
    padding: 0.3rem;
    resize: none;
    margin: 0.5rem;
  }
  
  button {
    border: 1px solid var(--gray-10);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 200;
    margin: 0 0.2rem;
  }

  button:disabled {
    color: #ddd;
    cursor: default;
  }

  button:not(:disabled):hover {
    background-color: #f9f9f9;
    box-shadow: 4px 4px 4px #ddd;
  }

  button:not(:disabled):active {
    box-shadow: inset 4px 4px 4px #ddd;
  }
`;