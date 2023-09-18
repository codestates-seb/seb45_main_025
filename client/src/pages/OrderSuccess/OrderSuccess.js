
//   {
//     "paymentid": 25,
//     "member": {
//         "createdAt": "2023-09-15T11:38:21",
//         "modifiedAt": "2023-09-17T08:23:43.184857",
//         "userId": 6,
//         "email": "son@son.com",
//         "name": "son",
//         "nickName": "son",
//         "password": "{bcrypt}$2a$10$pnfmlCWoUifTdrebO7GAB.nn7pAOxjwoCXouPX/5YXeZMsrcD2OAy",
//         "gender": "female",
//         "phone": "123",
//         "birth": "2023-09-05",
//         "address": "korea",
//         "img": null,
//         "point": 82000,
//         "isOauth": null,
//         "roles": [
//             "USER"
//         ],
//         "memberStatus": "MEMBER_ACTIVE"
//     },
//     "paymentItems": [
//         {
//             "paymentid": null,
//             "products": {
//                 "productId": 14,
//                 "productName": "감자 초콜릿",
//                 "category": "Chocolate",
//                 "img": "image/1fb45313-2152-4759-b662-a7a170efcbb5_빵빵이2.jpg",
//                 "content": "식품 유형",
//                 "productDescription": "제품 설명",
//                 "rawmaterial": "원재료명",
//                 "precautions": "주의사항",
//                 "manufacturer": "제조사",
//                 "productPrice": 3000.0,
//                 "likes": 0,
//                 "createdAt": "2023-09-16T20:03:48",
//                 "modifiedAt": "2023-09-16T20:03:48",
//                 "bookmarked": false,
//                 "member": null
//             },
//             "quantity": 2,
//             "price": 3000.0,
//             "subtotal": 6000.0
//         }
//     ],
//     "orderDate": "2023-09-17T08:23:43.166863",
//     "totalAmount": 6000.0,
//     "paidWithPoints": true,
//     "recipientName": "youngjin",
//     "address": "korea",
//     "phone": "12345",
//     "request": ""
// }
// TODO: orders/create로 post 요청 (recipientName, address, phone, request, orderList+quantity)
// TODO: 주문한 아이템 리스트 보여주기
// TODO: keep shopping, order history 버튼
// TODO: recipientName, address, name, phone 정보 초기화
import { OrderSuccessContainer, OrderInfoContainer } from './OrderSuccess.styled';
import { Link, useSearchParams } from 'react-router-dom';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import snackImg from '../../common/image/main-image.png';
import { useState, useEffect } from 'react';
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
  console.log(name, address, phone, request);


  const handleOrder = () => {
    const data = {
      "recipientName": name,
      "address": address,
      "phone": phone,
      "request": request,
      "selectedCartItems": selectedId,
    };

    // console.log(data);
    accessToken = getAccessToken();

    axios.post(`${apiUrl}/orders/create`, data, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 201) {
          console.log('data', response.data);
          setOrderData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    accessToken = getAccessToken();
    handleOrder();
  }, []);



  // FIXME: 선택상품만 주문하는 거 안됨 (서버 문제)
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
            {/* <div className='title'>ORDER LIST</div>
            <OrderInfoContainer>
              {orderData.paymentItems.length &&
                orderData.paymentItems.map((item => (
                  <div key={item.products.productId}>
                    <div>{item.products.productName}</div>
                    <div>{item.products.productPrice}</div>
                    <div>quantity {item.quantity}</div>
                    <div>{item.subtotal}</div>
                  </div>
                )))}
              <div>&#8361; {orderData.totalAmount}</div>
            </OrderInfoContainer> */}

            {/* <div className='title'>SHIPPING INFORMATION</div> */}
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
            <button>Keep Shopping</button>
          </Link>
          <Link to='/order-history'>
            <button>Order History</button>
          </Link>
        </div>
      </OrderSuccessContainer>
    </>
  );
}