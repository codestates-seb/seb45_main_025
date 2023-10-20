import {NotFoundContainer, NotFoundMain} from './NotFound.styled';
import error from '../../common/image/error.jpg';

export default function NotFound(){
  return (
    <NotFoundContainer>
      <NotFoundMain>
        <img src={error} alt='error'/>
        <h1>PAGE NOT FOUND</h1>
        <p>We looked everywhere to find this page<br/>
          Are you sure the website URL is correct?<br/>
          Get in touch with the site owner.
        </p>
        <a href="https://kr.freepik.com/free-vector/isometric-error-background-hand-reaches-out-from-the-hole-with-the-sign-of-error-four-hundred-and-four-vector-illustration_23581957.htm#page=2&query=error%20page&position=20&from_view=search&track=ais">작가 macrovector</a>
      </NotFoundMain>
    </NotFoundContainer>
  )
}