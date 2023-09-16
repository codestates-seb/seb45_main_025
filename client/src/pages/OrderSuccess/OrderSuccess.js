// TODO: orders/create로 post 요청 (recipientName, address, phone, request, orderList+quantity)
// TODO: 주문한 아이템 리스트 보여주기
// TODO: keep shopping, order history 버튼
// TODO: recipientName, address, name, phone 정보 초기화
import { OrderSuccessContainer, OrderInfoContainer } from './OrderSuccess.styled';
import { Link, useSearchParams } from 'react-router-dom';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import snackImg from '../../common/image/main-image.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function OrderSuccess() {
  // const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const address = searchParams.get("address");
  const phone = searchParams.get("phone");
  const request = searchParams.get("request");
  const selectedId = searchParams.getAll("productId");
  const apiUrl = process.env.REACT_APP_API_URL;
  let accessToken = getAccessToken();
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    accessToken = getAccessToken();
    handleOrder();
  }, []);

  const handleOrder = () => {
    const data = {
      "recipientName": name,
      "address": address,
      "phone": phone,
      "request": request,
      "selectedCartItems": selectedId,
    };

    console.log(data);
    accessToken = getAccessToken();

    axios.post(`${apiUrl}/orders/create`, data, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 201) {
          console.log('data', response.data);
          setOrderData(response.data);
          console.log(orderData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <BackgroundImage imgSrc={snackImg} title='ACCOUNT' />
      <OrderSuccessContainer>
        <h1>PAYMENT SUCCESSFUL</h1>
        <OrderInfoContainer>
          <div>No. {orderData.paymentid}</div>
          <div>{orderData.orderDate}</div>
          {orderData.paymentItems.map((item => (
            <div key={item.product.id}>
              {/* TODO: 주문한 아이템 정보 렌더링 (이미지, 상품명, 수량, 가격, ) */}
            </div>
          )))}
          <div>&#8361; {orderData.totalAmount}</div>
        </OrderInfoContainer>
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