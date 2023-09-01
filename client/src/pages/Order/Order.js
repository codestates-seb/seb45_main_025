import {
  PageContainer,
  OrderContainer,
  FormContainer
} from './Order.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { useSelector } from 'react-redux';

export default function Order() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  return (
    <PageContainer>
      <BackgroundImage imgSrc={Background} title='Account' />
      <OrderContainer>
        <div className='title'>ORDER</div>
        <div className='products'>
          {cartItems.map(item => (
            <div key={item.product_id}>
              {item.product_name}
            </div>
          ))}
        </div>
        <FormContainer className='customer-info'>
          <div>NAME</div>
          <div>PHONE</div>
          <div>EMAIL</div>
        </FormContainer>
        <FormContainer className='address-info'>
          <div>ADDRESS</div>
          <div>RECIPIENT NAME</div>
          <div>PHONE</div>
          <div>REQUEST</div>
        </FormContainer>
        <FormContainer>
          <div>PAYMENT INFO</div>
        </FormContainer>
        {/* <button>CANCLE</button> */}
        <button>ORDER</button>
      </OrderContainer>
    </PageContainer>
  )
}