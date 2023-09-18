import {
  OrderHistoryPageContainer,
  OrderHistoryContainer,
  OrderCard,
  // OrderItem,
} from './OrderHistory.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { useEffect, useState } from 'react';
import getAccessToken from '../../common/utils/getToken';
import axios from 'axios';

export default function OrderHistory() {
  const [orderedItems, setOrderedItems] = useState();
  let accessToken = getAccessToken();
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = () => {
    accessToken = getAccessToken();

    axios
      .get(`${apiUrl}/orders/history`, { headers: { Authorization: accessToken } })
      .then((response) => {
        console.log(response.data);
        setOrderedItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <OrderHistoryPageContainer>
      <BackgroundImage imgSrc={Background} title={'MY PAGE'} />
      <OrderHistoryContainer>
        <div className='title'>MY ORDER</div>
        {orderedItems &&
          orderedItems.reverse().map((el) => (
            <OrderCard key={el.orderId} className='order-container'>
              <div className='order-date'>{el.orderDate.slice(0, 10).replaceAll('-', '.')}</div>
              {/* {el.items.map((item) => (
                <OrderItem key={item.productId}>{item.productName}</OrderItem>
              ))} */}
            </OrderCard>
          ))}
      </OrderHistoryContainer>
    </OrderHistoryPageContainer>
  )
}