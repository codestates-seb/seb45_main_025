import {
  OrderHistoryPageContainer,
  OrderHistoryContainer,
  // OrderCard,
  // OrderItem,
} from './OrderHistory.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import getAccessToken from '../../common/utils/getToken';
// import axios from 'axios';

export default function OrderHistory() {
  // const [orderedItems, setOrderedItems] = useState();
  // let accessToken = getAccessToken();
  // const apiUrl = process.env.REACT_APP_API_URL;

  // const fetchData = () => {
  //   accessToken = getAccessToken();

  //   axios
  //     .get(`${apiUrl}/orders/history`, { headers: { Authorization: accessToken } })
  //     .then((response) => {
  //       console.log(response.data);
  //       setOrderedItems(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <OrderHistoryPageContainer>
      <BackgroundImage imgSrc={Background} title={'MY PAGE'} />
      <OrderHistoryContainer>
        <div className='title'>MY ORDER</div>
        <div className='incomplete-container'>
          <div className='incomplete'>Sorry</div>
          <div className='incomplete'>This feature is still under development.</div>
        </div>
        {/* {orderedItems &&
          orderedItems.reverse().map((el) => (
            <OrderCard key={el.orderId} className='order-container'>
              <div className='order-date'>{el.orderDate.slice(0, 10).replaceAll('-', '.')}</div>
              {el.items.map((item) => (
                <OrderItem key={item.productId}>{item.productName}</OrderItem>
              ))}
            </OrderCard>
          ))} */}
        <Link to='/mypage' onClick={() => scrollTo(0, 0)}>
          <button>Return to mypage</button>
        </Link>
      </OrderHistoryContainer>
    </OrderHistoryPageContainer>
  )
}