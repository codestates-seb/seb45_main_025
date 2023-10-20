import {
  OrderPageContainer, OrderContainer,
  FormContainer, FormTitle, FormCotents, ButtonContainer,
  FlexBox, LeftBox, RightBox
} from './Order.styled';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import Background from '../../common/image/main-image.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOrderName, setOrderAddress, setOrderPhone, setOrderRequest
} from '../../redux/actions/orderActions';
import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../common/image/Icons/edit.svg';
import { useState, useEffect, useRef } from 'react';
import { handleScrollY } from '../../redux/thunks/scrollThunks';
import { ReactComponent as AlertIcon } from '../../common/image/Icons/alert.svg';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function Order() {
  const dispatch = useDispatch();
  const scrollY = useSelector((state) => state.scroll.scrollY);
  const selectedItems = useSelector((state) => state.cart.selected);
  const subtotalPrice = useSelector((state) => state.cart.subtotalPrice);
  const inputName = useSelector((state) => state.order.orderName);
  const inputAddress = useSelector((state) => state.order.orderAddress);
  const inputPhone = useSelector((state) => state.order.orderPhone);
  const inputRequest = useSelector((state) => state.order.orderRequest);
  const inputNameRef = useRef();
  const inputAddressRef = useRef();
  const inputPhoneRef = useRef();
  const [inputNameMsg, setInputNameMsg] = useState('');
  const [inputAddressMsg, setInputAddressMsg] = useState('');
  const [inputPhoneMsg, setInputPhoneMsg] = useState('');
  const [customerInfo, setCustomerInfo] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const accessToken = getAccessToken();
  const rightBoxRef = useRef();
  const rightBoxHeight = rightBoxRef.current ? rightBoxRef.current.clientHeight : 0;
  console.log('rightBoxHeight: ', rightBoxHeight);
  console.log(selectedItems.map(item => item.product.id));

  useEffect(() => {
    fetchCustomerInfo();
    window.addEventListener('scroll', () => {
      dispatch(handleScrollY());
    });
    return () => {
      window.removeEventListener('scroll', () => {
        dispatch(handleScrollY());
      });
    };
  }, [dispatch]);

  const fetchCustomerInfo = () => {
    axios.get(`${apiUrl}/mypage`, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 200) {
          setCustomerInfo(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const inputNameHandler = (event) => {
    const inputValue = event.target.value;
    dispatch(setOrderName(inputValue));
    if (inputValue) {
      setInputNameMsg('')
    }
  }

  const inputAddressHandler = (event) => {
    const inputValue = event.target.value;
    dispatch(setOrderAddress(inputValue));
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
    dispatch(setOrderPhone(numericValue));
  }

  const inputRequestHandler = (event) => {
    dispatch(setOrderRequest(event.target.value));
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
                <div className='info-contents'>{customerInfo.name}</div>
                <div className='info-title'>PHONE</div>
                <div className='info-contents'>{customerInfo.phone}</div>
                <div className='info-title'>EMAIL</div>
                <div className='info-contents'>{customerInfo.email}</div>
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
                  {selectedItems.map((item) => (
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