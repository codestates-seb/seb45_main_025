import { CartPageContainer } from './Cart.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import BackgroundImg from '../../common/image/main-image.png';
import CartList from '../../components/CartList/CartList';

export default function Cart() {
  return (
    <CartPageContainer>
      <BackgroundImage imgSrc={BackgroundImg} title='ACCOUNT' />
      <div className='content'>
        <div className='title'>CART</div>
        <CartList />
      </div>
    </CartPageContainer>
  )
}