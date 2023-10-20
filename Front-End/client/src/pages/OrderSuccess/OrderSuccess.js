// FIXME: 서버와 주문 연동 실패
import { OrderSuccessContainer, OrderInfoContainer } from './OrderSuccess.styled';
import { Link, useSearchParams } from 'react-router-dom';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import snackImg from '../../common/image/main-image.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const address = searchParams.get("address");
  const phone = searchParams.get("phone");
  const request = searchParams.get("request");
  const selectedId = searchParams.getAll("productId");
  const apiUrl = process.env.REACT_APP_API_URL;
  let accessToken = getAccessToken();
  const [orderData, setOrderData] = useState();

  const handleOrder = () => {
    const data = {
      "recipientName": name,
      "address": address,
      "phone": phone,
      "request": request,
      "selectedCartItems": selectedId,
    };

    accessToken = getAccessToken();

    axios.post(`${apiUrl}/orders/create`, data, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 201) {
          setOrderData(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to payment request', error);
      });
  }

  useEffect(() => {
    accessToken = getAccessToken();
    handleOrder();
  }, []);

  return (
    <>
      <BackgroundImage imgSrc={snackImg} title='ACCOUNT' />
      <OrderSuccessContainer>
        <h1>PAYMENT SUCCESSFUL</h1>
        {orderData &&
          <>
            <div className='flex-row space-between'>
              <div className='font-light'>No. {orderData.paymentid}</div>
              <div className='font-light'>{orderData.orderDate.slice(0, 10).replaceAll('-', '.')} {orderData.orderDate.slice(11, 16)}</div>
            </div>
            <OrderInfoContainer>
              <div className='flex-row'>
                <div className='info-title'>PAYMENT AMOUNT</div>
                <div className='info-content'>{`${Number(
                  searchParams.get("amount")
                ).toLocaleString()}`}</div>
              </div>
              <div className='flex-row'>
                <div className='info-title'>RECIPIENT NAME</div>
                <div className='info-content'>{name}</div>
              </div>
              <div className='flex-row'>
                <div className='info-title'>ADDRESS</div>
                <div className='info-content'>{address}</div>
              </div>
              <div className='flex-row'>
                <div className='info-title'>PHONE</div>
                <div className='info-content'>{phone}</div>
              </div>
              {request ?
                <>
                  <div>Request</div>
                  <div>{request}</div>
                </> :
                ''}
            </OrderInfoContainer>
          </>
        }
        <div>
          <Link to='/list'>
            <button onClick={() => scrollTo(0, 0)}>Keep Shopping</button>
          </Link>
          <Link to='/order-history'>
            <button onClick={() => scrollTo(0, 0)}>Order History</button>
          </Link>
        </div>
      </OrderSuccessContainer>
    </>
  );
}