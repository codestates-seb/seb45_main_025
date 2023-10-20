// FIXME: 서버와 주문 연동 실패
import {
  OrderHistoryPageContainer,
  OrderHistoryContainer,
} from './OrderHistory.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { Link } from 'react-router-dom';
export default function OrderHistory() {

  return (
    <OrderHistoryPageContainer>
      <BackgroundImage imgSrc={Background} title={'MY PAGE'} />
      <OrderHistoryContainer>
        <div className='title'>MY ORDER</div>
        <div className='incomplete-container'>
          <div className='incomplete'>Sorry</div>
          <div className='incomplete'>This feature is still under development.</div>
        </div>
        <Link to='/mypage' onClick={() => scrollTo(0, 0)}>
          <button>Return to mypage</button>
        </Link>
      </OrderHistoryContainer>
    </OrderHistoryPageContainer>
  )
}