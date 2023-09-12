import { OrderSuccessContainer } from './OrderSuccess.styled';
import { Link, useSearchParams } from 'react-router-dom';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  console.log('success');

  return (
    <OrderSuccessContainer>
      <h1>Payment Successful</h1>
      <div>{`Order Id: ${searchParams.get("orderId")}`}</div>
      <div>{`Payment Amount: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
      <div>
        <Link to='/products'>
          <button>Keep Shopping</button>
        </Link>
        <Link to='/order-list'>
          <button>Order History</button>
        </Link>
      </div>
    </OrderSuccessContainer>
  );
}
//http://localhost:3000/order/success?paymentType=NORMAL&orderId=P82pgoQE4x6K0Kou_mn4Q&paymentKey=ZDBYqJLQ1GKNbdOvk5rkwny7zAlRmzrn07xlzmj6R9e4oPpE&amount=5100