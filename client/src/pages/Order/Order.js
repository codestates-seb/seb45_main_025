// TODO: 주문자 정보는 회원 정보 중 이름, 전화번호, 이메일 보여줌
// TODO: 배송지 정보는 배송지 주소 선택, 추가할 수 있게 + 이름 + 전화번호 + 요청사항
// TODO: 결제 정보는 포인트로 결제하도록
// TODO: 주문 상품은 항상 오른쪽에 띄우고 밑에 주문 버튼 넣기
import {
  PageContainer,
  OrderContainer,
  FormCotents,
  ButtonContainer,
  FormTitle,
  FormContainer
} from './Order.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../common/image/Icons/edit.svg';

export default function Order() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedId = useSelector((state) => state.cart.selected);
  const selectedItems = cartItems.filter(item => selectedId.includes(item.product_id));

  const handleOrder = () => {
    // TODO: [POST] /order
  }

  return (
    <PageContainer>
      <BackgroundImage imgSrc={Background} title='ACCOUNT' />
      <OrderContainer>
        <div className='title'>ORDER</div>
        <FormContainer>
          <FormTitle>ORDER LIST</FormTitle>
          <FormCotents>
            {selectedItems.map(item => (
              <div key={item.product_id}>
                {item.product_name}
              </div>
            ))}
          </FormCotents>
        </FormContainer>
        <FormContainer>
          <FormTitle>CUSTOMER INFORMATION</FormTitle>
          <Link to='/mypage/edit'>
            <button
              className='edit-button'
              onClick={() => window.scroll(0, 0)}
            >
              <EditIcon />
            </button>
          </Link>
          <FormCotents className='customer-info'>
            <div className='info-title'>NAME</div>
            <div className='info-contents'>sonyoungjin</div>
            <div className='info-title'>PHONE</div>
            <div className='info-contents'>012-3456-7890</div>
            <div className='info-title'>EMAIL</div>
            <div className='info-contents'>youngjin123@gmail.com</div>
          </FormCotents>
        </FormContainer>
        <FormContainer>
          <FormTitle>SHIPPING ADDRESS</FormTitle>
          <FormCotents className='address-info'>
            <label htmlFor='order-name'>RECIPIENT NAME</label>
            <input id='order-name' type='text' />
            <label htmlFor='order-address'>ADDRESS</label>
            <input id='order-address' type='text' />
            <label htmlFor='order-phone'>PHONE</label>
            <input id='order-phone' type='text' />
            <label htmlFor='order-request'>REQUEST</label>
            <input id='order-request' type='text' />
          </FormCotents>
        </FormContainer>
        <FormContainer>
          <FormTitle>PAYMENT METHOD</FormTitle>
          <FormCotents>
            <div>PAYMENT INFO</div>
          </FormCotents>
        </FormContainer>
      </OrderContainer>
      <ButtonContainer>
        <Link to='/cart'>
          <button onClick={() => window.scroll(0, 0)}>RETURN TO CART</button>
        </Link>
        <Link to='/order-list'>
          <button onClick={handleOrder}>ORDER</button>
        </Link>
      </ButtonContainer>
    </PageContainer>
  )
}