import {styled} from 'styled-components';

export const MyWritingContainer = styled.div`
  min-height: 1500px;
`

export const MyWritingMain = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h2{
    color: var(--gray-90);
    font-weight: 900;
    letter-spacing: 5px;
    font-size: 2.5rem;
    margin: 2rem 0 5rem 0;
  }
  > div:last-child{
    border-bottom: 1px solid var(--gray-10);
  }
`

export const MyWritingEle = styled.div`
  width: 60vw;
  min-width: 30rem;
  min-height: 6rem;
  padding: 1rem;
  border-top: 1px solid var(--gray-10);
  border-right: 1px solid var(--gray-10);
  border-left: 1px solid var(--gray-10);
  .mywritingtop{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .mywritimglittle{
    display: flex;
    flex-direction: row;
    p{
      margin-left: 0.3rem;
      font-size: 0.8rem;
    }
  }
  a{
    font-size: 1.2rem;
  }
`