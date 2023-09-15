import {
  OrderListPageContainer,
  OrderListContainer,
  OrderCard,
  OrderItem,
} from './OrderList.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { useEffect, useState } from 'react';

export default function OrderList() {
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    setOrderedItems([
      {
        "orderId": 1,
        "orderDate": "2020 09 12",
        "items": [
          {
            productId: 1,
            productName: 'Candy',
            quantity: 2,
            price: 1000,
            reviewed: true,
          },
          {
            productId: 3,
            productName: 'Cruncky',
            quantity: 1,
            price: 1500,
            reviewed: false,
          }
        ]
      }, {
        "orderId": 2,
        "orderDate": "2023 06 07",
        "items": [
          {
            productId: 2,
            productName: 'Shrimp Cracker',
            quantity: 2,
            price: 2000,
            reviewed: true,
          },
          {
            productId: 4,
            productName: 'Turtle Chips',
            quantity: 1,
            price: 2400,
            reviewed: false,
          }
        ]
      }
    ])
  }, []);

  return (
    <OrderListPageContainer>
      <BackgroundImage imgSrc={Background} title={'ACCOUNT'} />
      <OrderListContainer>
        <div className='title'>ORDER LIST</div>
        {orderedItems.length > 0 &&
          orderedItems.map((el) => (
            <OrderCard key={el.orderId} className='order-container'>
              <div className='order-date'>{el.orderDate}</div>
              {el.items.map((item) => (
                <OrderItem key={item.productId}>{item.productName}</OrderItem>
              ))}
            </OrderCard>
          ))}
      </OrderListContainer>
    </OrderListPageContainer>
  )
}