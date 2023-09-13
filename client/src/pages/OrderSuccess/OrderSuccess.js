import { OrderSuccessContainer } from './OrderSuccess.styled';
import { Link, useSearchParams } from 'react-router-dom';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import snackImg from '../../common/image/main-image.png';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  console.log('success');

  return (
    <>
      <BackgroundImage imgSrc={snackImg} title='ACCOUNT' />
      <OrderSuccessContainer>
        <h1>PAYMENT SUCCESSFUL</h1>
        <div>{`Order Id: ${searchParams.get("orderId")}`}</div>
        <div>Payment Amount: &#8361; {`${Number(
          searchParams.get("amount")
        ).toLocaleString()}`}</div>
        <div>
          <Link to='/products'>
            <button>Keep Shopping</button>
          </Link>
          <Link to='/order-list'>
            <button>Order History</button>
          </Link>
        </div>
      </OrderSuccessContainer>
    </>
  );
}