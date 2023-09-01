import { OrderContainer } from './Order.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';

export default function Order() {
  return (
    <OrderContainer>
      <BackgroundImage imgSrc={Background} title='Account' />
      <div className='title'>ORDER</div>
    </OrderContainer>
  )
}