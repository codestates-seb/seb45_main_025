// TODO: 배송지 정보는 배송지 주소 선택, 추가할 수 있게 + 이름 + 전화번호 + 요청사항
// TODO: 결제 정보는 포인트로 결제하도록
import {
  OrderPageContainer,
  OrderContainer,
  FormCotents,
  ButtonContainer,
  FormTitle,
  FormContainer,
  FlexBox,
  LeftBox,
  RightBox
} from './Order.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../common/image/Icons/edit.svg';
import { useState, useEffect, useRef } from 'react';
import { handleScrollY } from '../../redux/thunks/scrollThunks';

export default function Order() {
  const dispatch = useDispatch();
  const scrollY = useSelector((state) => state.scroll.scrollY);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedId = useSelector((state) => state.cart.selected);
  const selectedItems = cartItems.filter(item => selectedId.includes(item.product.id));
  const [inputName, setInputName] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputRequest, setInputRequest] = useState('');
  const inputNameRef = useRef();
  const inputAddressRef = useRef();
  const inputPhoneRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      dispatch(handleScrollY());
    });
    return () => {
      window.removeEventListener('scroll', () => {
        dispatch(handleScrollY());
      });
    };
  }, [dispatch]);

  const inputNameHandler = (event) => {
    setInputName(event.target.value);
  }

  const inputAddressHandler = (event) => {
    setInputAddress(event.target.value);
  }

  const inputPhoneHandler = (event) => {
    setInputPhone(event.target.value);
  }

  const inputRequestHandler = (event) => {
    setInputRequest(event.target.value);
  }

  const handleOrder = (event) => {
    if (!isInputValid) {
      window.scroll(0, 940);
    }
    if (!inputName) {
      alert(`Please enter the recipient's name`);
      inputNameRef.current.focus();
      return;
    } else if (!inputAddress) {
      alert(`Please enter the address`);
      inputAddressRef.current.focus();
      return;
    } else if (!inputPhone) {
      alert(`Please enter the phone number`);
      inputPhoneRef.current.focus();
      return;
    }

    const data = {
      name: inputName,
      address: inputAddress,
      phone: inputPhone,
      request: inputRequest,
    };

    console.log(data);

    const orderConfirm = window.confirm(`Order`);
    if (!orderConfirm) {
      event.preventDefault();
      return;
    }

    // TODO: [POST] /order

    window.scroll(0, 0);
  }

  const isInputValid = inputName && inputAddress && inputPhone;

  return (
    <OrderPageContainer>
      <BackgroundImage imgSrc={Background} title='ACCOUNT' />
      <OrderContainer>
        <div className='title'>ORDER</div>
        <FlexBox>
          <LeftBox>
            <FormContainer>
              <FormTitle>CUSTOMER INFORMATION</FormTitle>
              <Link to='/mypage/edit'>
                <button
                  className='edit-button'
                  onClick={() => window.scroll(0, 0)}
                ><EditIcon /></button>
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
                <input
                  id='order-name'
                  type='text'
                  value={inputName}
                  ref={inputNameRef}
                  onChange={inputNameHandler} />
                <label htmlFor='order-address'>ADDRESS</label>
                <input
                  id='order-address'
                  type='text'
                  value={inputAddress}
                  ref={inputAddressRef}
                  onChange={inputAddressHandler} />
                <label htmlFor='order-phone'>PHONE</label>
                <input
                  id='order-phone'
                  type='text'
                  value={inputPhone}
                  ref={inputPhoneRef}
                  onChange={inputPhoneHandler} />
                <label htmlFor='order-request'>REQUEST</label>
                <input
                  id='order-request'
                  type='text'
                  value={inputRequest}
                  onChange={inputRequestHandler} />
              </FormCotents>
            </FormContainer>
            <FormContainer>
              <FormTitle>PAYMENT METHOD</FormTitle>
              <FormCotents>
                <label htmlFor='point'>Point</label>
                <div className='point'>
                  <input id='point' type="text" />
                  <button>Use All</button>
                </div>
              </FormCotents>
            </FormContainer>
          </LeftBox>
          <RightBox className={scrollY > 490 ? 'fixed' : 'absolute'}>
            <FormContainer>
              <FormTitle>ORDER LIST</FormTitle>
              <FormCotents>
                {selectedItems.map((item) => (
                  <div key={item.product.id} className='order-list'>
                    <div className='product-name'>{item.product.productName}</div>
                    <div
                      className='flex-row'
                      key={item.product.id}>
                      <div className='product-price'>$ {item.product.productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      <div>x</div>
                      <div className='product-quantity'>{item.quantity}</div>
                      <div>=</div>
                      <div className='total-price'>$ {item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                  </div>
                ))}
                <div className='subtotal-price'>
                  $ {selectedItems.reduce((total, item) => total + item.totalPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <ButtonContainer>
                  <Link to='/cart'>
                    <button onClick={() => window.scroll(0, 0)}>
                      RETURN TO CART</button>
                  </Link>
                  <Link to={isInputValid ? '/order-list' : '#'}>
                    <button
                      className='order-btn'
                      onClick={handleOrder}>ORDER</button>
                  </Link>
                </ButtonContainer>
              </FormCotents>
            </FormContainer>
          </RightBox>
        </FlexBox>
      </OrderContainer>
    </OrderPageContainer>
  )
}