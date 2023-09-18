import { Link } from 'react-router-dom';
import { OrderFailContainer } from './OrderFail.styled';
// import { useSearchParams } from 'react-router-dom';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import mainImg from '../../common/image/main-image.png';
import { ReactComponent as AlertIcon } from '../../common/image/Icons/alert.svg';

export default function OrderFail() {

  return (
    <>
      <BackgroundImage imgSrc={mainImg} title='PAYMENT' />
      <OrderFailContainer>
        <h1>FAILED</h1>
        <div><AlertIcon /> This payment method is not supported.</div>
        <div>
          <Link to={`${window.location.origin}/cart`}>
            <button>Try Again</button>
          </Link>
        </div>
      </OrderFailContainer>
    </>
  );
}