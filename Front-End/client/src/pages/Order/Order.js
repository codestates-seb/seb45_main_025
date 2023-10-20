import {
  OrderPageContainer, OrderContainer,
  FormContainer, FormTitle, FormCotents, ButtonContainer,
  FlexBox, LeftBox, RightBox
} from './Order.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';

import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../common/image/Icons/edit.svg';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as AlertIcon } from '../../common/image/Icons/alert.svg';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';
import { useCartStore } from '../../stores/cartStore';
import { useOrderStore } from '../../stores/orderStore';
import { useScrollStore } from '../../stores/scrollStore';

export default function Order() {
  const { scrollY, setScrollY } = useScrollStore();
  const { selected, subtotalPrice } = useCartStore();
  const { inputName, inputAddress, inputPhone, inputRequest, setInputName, setInputAddress, setInputPhone, setInputRequest } = useOrderStore();
  const inputNameRef = useRef();
  const inputAddressRef = useRef();
  const inputPhoneRef = useRef();
  const [inputNameMsg, setInputNameMsg] = useState('');
  const [inputAddressMsg, setInputAddressMsg] = useState('');
  const [inputPhoneMsg, setInputPhoneMsg] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const accessToken = getAccessToken();
  const rightBoxRef = useRef();
  
  useEffect(() => {
    fetchCustomerInfo();
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        setScrollY(window.scrollY);
      });
    };
  }, []);

  const fetchCustomerInfo = () => {
    axios.get(`${apiUrl}/mypage`, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to get user information', error);
      });
  }

  const inputNameHandler = (event) => {
    const inputValue = event.target.value;
    setInputName(inputValue);
    if (inputValue) {
      setInputNameMsg('')
    }
  }

  const inputAddressHandler = (event) => {
    const inputValue = event.target.value;
    setInputAddress(inputValue);
    if (inputValue) {
      setInputAddressMsg('');
    }
  }

  const inputPhoneHandler = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue !== numericValue) {
      setInputPhoneMsg('Only numbers');
    } else {
      setInputPhoneMsg('');
    }
    setInputPhone(numericValue);
  }

  const inputRequestHandler = (event) => {
    setInputRequest(event.target.value);
  }

  const handleOrder = () => {
    setInputNameMsg('');
    setInputAddressMsg('');
    setInputPhoneMsg('');

    if (!inputPhone) {
      setInputPhoneMsg(`Please enter the phone number`);
      inputPhoneRef.current.focus();
    }
    if (!inputAddress) {
      setInputAddressMsg(`Please enter the address`);
      inputAddressRef.current.focus();
    }
    if (!inputName) {
      setInputNameMsg(`Please enter the recipient's name`);
      inputNameRef.current.focus();
    }
    if (!isInputValid) {
      scrollTo(0, 654);
      return;
    }

    window.scroll(0, 0);
  }

  const isInputValid = inputName && inputAddress && inputPhone;

  return (
    <OrderPageContainer>
      <BackgroundImage imgSrc={Background} title='ORDER' />
      <OrderContainer>
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
                <div className='info-contents'>{userInfo.name}</div>
                <div className='info-title'>PHONE</div>
                <div className='info-contents'>{userInfo.phone}</div>
                <div className='info-title'>EMAIL</div>
                <div className='info-contents'>{userInfo.email}</div>
              </FormCotents>
            </FormContainer>
            <FormContainer>
              <FormTitle>SHIPPING ADDRESS</FormTitle>
              <FormCotents className='address-info'>
                <label htmlFor='order-name'>
                  RECIPIENT NAME
                  {inputNameMsg !== ''
                    ? <div className='guide-msg'>
                      <AlertIcon />{inputNameMsg}</div> : ''}
                </label>
                <input
                  id='order-name'
                  type='text'
                  value={inputName}
                  ref={inputNameRef}
                  onChange={inputNameHandler} />
                <label htmlFor='order-address'>
                  ADDRESS
                  {inputAddressMsg !== ''
                    ? <div className='guide-msg'>
                      <AlertIcon />{inputAddressMsg}</div> : ''}
                </label>
                <input
                  id='order-address'
                  type='text'
                  value={inputAddress}
                  ref={inputAddressRef}
                  onChange={inputAddressHandler} />
                <label htmlFor='order-phone'>
                  PHONE
                  {inputPhoneMsg !== ''
                    ? <div className='guide-msg'>
                      <AlertIcon />{inputPhoneMsg}</div> : ''}
                </label>
                <input
                  id='order-phone'
                  type='text'
                  value={inputPhone}
                  ref={inputPhoneRef}
                  onChange={inputPhoneHandler} />
                <label htmlFor='order-request'>{`REQUEST (Optional)`}</label>
                <input
                  id='order-request'
                  type='text'
                  value={inputRequest}
                  onChange={inputRequestHandler} />
              </FormCotents>
            </FormContainer>
          </LeftBox>
          <RightBox
            className={scrollY > 350 ? 'fixed' : 'absolute'}
            ref={rightBoxRef}>
            <FormContainer>
              <FormTitle>ORDER LIST</FormTitle>
              <FormCotents>
                <div className='order-list-container'>
                  {selected.map((item) => (
                    <div key={item.product.id} className='order-list'>
                      <img src={`${apiUrl}${item.product.img}`} alt='' />
                      <div className='flex-grow'>
                        <div className='flex-row'>
                          <div className='product-name'>{item.product.productName}</div>
                          <div className='total-price'>&#8361; {(item.product.productPrice * item.quantity).toLocaleString()}</div>
                        </div>
                        <div
                          className='flex-row'
                          key={item.product.id}>
                          <div className='product-quantity'>
                            quantity {item.quantity}</div>
                          <div className='product-price'>&#8361; {(item.product.productPrice).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='subtotal-price'>
                  &#8361; {subtotalPrice.toLocaleString()}
                </div>
                <ButtonContainer>
                  <Link to='/cart'>
                    <button onClick={() => window.scroll(0, 0)}>
                      RETURN TO CART</button>
                  </Link>
                  <Link to={isInputValid ? '/order/checkout' : '#'}>
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
    </OrderPageContainer >
  )
}