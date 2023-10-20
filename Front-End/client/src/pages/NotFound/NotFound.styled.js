import {styled} from 'styled-components'
export const NotFoundContainer = styled.div`
  height: 1000px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const NotFoundMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-width: var(--main-width);
  padding: 10rem 0;
  > img{
    padding-top: 2rem;
    width: 20rem;
  }
  > h1{
    font-size: 2rem;
    color: var(--brown-10);
    padding-bottom: 1rem;
  }
  > p{
    color: var(--gray-50);
  }
  > a{
    font-size: 0.001rem;
    color: rgba(0,0,0,0.1)
  }
`