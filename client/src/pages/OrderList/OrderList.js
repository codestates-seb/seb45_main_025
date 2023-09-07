import {
  OrderListPageContainer,
  OrderListContainer
} from './OrderList.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';

export default function OrderList() {
  return (
    <OrderListPageContainer>
      <BackgroundImage imgSrc={Background} title={'ACCOUNT'} />
      <OrderListContainer>
        <div className='title'>ORDER LIST</div>
      </OrderListContainer>
    </OrderListPageContainer>
  )
}