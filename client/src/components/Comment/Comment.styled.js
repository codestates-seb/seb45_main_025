import { styled } from 'styled-components';

export const CommentContainer = styled.div`
  border-bottom: 1px solid var(--gray-10);
  padding: 1rem 1.3rem;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;

  .info {
    display: flex;
    flex-direction: row;
    /* justify-content: flex-end; */
    width: 100%;
    margin: 0.3rem 0;

    div {
      overflow-wrap: break-word;
      font-size: 0.8rem;
      color: gray;
    }

    .date {
      margin: 0 0.2rem;
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

    .btn-container {
      display: flex;
      flex-direction: row;
    }

  button {
    font-weight: 300;
    border: 1px solid var(--gray-10);
    padding: 0.3rem;
    border-radius: 5px;
    margin: 0.2rem;
    font-size: 0.9rem;
  }

  .delete-btn {
    border: 1px solid var(--red-90);
    color: var(--red-90);
  }
`;