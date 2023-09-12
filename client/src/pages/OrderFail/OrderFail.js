import { OrderFailContainer } from './OrderFail.styled';
import { useSearchParams } from 'react-router-dom';

export default function OrderFail() {
  const [searchParams] = useSearchParams();

  return (
    <OrderFailContainer>
      <h1>Payment Failed</h1>
      <div>{`Reason: ${searchParams.get("message")}`}</div>
    </OrderFailContainer>
  );
}