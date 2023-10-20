import {
  CartListContainer,
  CartTable,
  ButtonsContainer,
  FlexBox
} from './CartList.styled';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCartItems,
  setSelected,
  setAllSelected,
  setSubtotalPrice
} from '../../redux/actions/cartActions';
import axios from 'axios';
import CartItem from '../CartItem/CartItem';
import getAccessToken from '../../common/utils/getToken';

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selected = useSelector((state) => state.cart.selected);
  const allSelected = useSelector((state) => state.cart.allSelected);
  const subtotalPrice = useSelector((state) => state.cart.subtotalPrice);
  const apiUrl = process.env.REACT_APP_API_URL;
  let accessToken = getAccessToken();

  useEffect(() => {
    console.log('useEffect');
    accessToken = getAccessToken();
    console.log('access token: ', accessToken);
    fetchCartItems();
    dispatch(setAllSelected(cartItems.length === selected.length));
  }, [dispatch]);

  const fetchCartItems = () => {
    //FIXME: 51~52 삭제
    // console.log('subtotal: ', selected.reduce((total, item) => total + item.totalPrice, 0));
    // dispatch(setSubtotalPrice(selected.reduce((total, item) => total + item.totalPrice, 0)));

    axios.get(`${apiUrl}/cart/list`, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          dispatch(setCartItems(data));
          dispatch(setSelected(data));
          dispatch(setAllSelected(true));
          dispatch(setSubtotalPrice(data.reduce((total, item) => total + item.totalPrice, 0)));
        }
      })
      .catch((error) => {
        console.error('Failed to load cart items: ', error);
      });
  }

  const handleAllCheckClick = () => {
    if (allSelected) {
      dispatch(setSelected([]));
      dispatch(setAllSelected(false));
      dispatch(setSubtotalPrice(0));
      console.log('isAllSelected: ', allSelected);
      console.log(selected.map(el => el.product.id));
    } else {
      dispatch(setSelected(cartItems));
      dispatch(setAllSelected(true));
      dispatch(setSubtotalPrice(cartItems.reduce((total, item) => total + item.totalPrice, 0)));
      console.log('isAllSelected: ', allSelected);
      console.log(selected.map(el => el.product.id));
    }
  };

  const handleOrder = () => {
    window.scroll(0, 0);
  }

  // DONE
  const handleDelete = (isAll) => {
    if (isAll) {
      axios.delete(`${apiUrl}/cart/clear`, { headers: { Authorization: accessToken } })
        .then((response) => {
          if (response.status === 204) {
            fetchCartItems();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let params = '';
      for (const item of selected) {
        params += `productIds=${item.product.id}&`
      }
      params = params.slice(0, -1);
      const removeCartUrl = `${apiUrl}/cart/remove-multiple?${params}`;
      axios.delete(removeCartUrl, { headers: { Authorization: accessToken } })
        .then((response) => {
          if (response.status === 200) {
            fetchCartItems();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    window.scroll(0, 315);
  }

  return (
    <CartListContainer>
      <CartTable>
        <thead>
          <tr>
            <th>
              <button
                className='checkbox-container'
                onClick={handleAllCheckClick} >
                <input
                  type='checkbox'
                  checked={allSelected && cartItems.length > 0}
                  disabled={cartItems.length === 0} />
              </button>
            </th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0
            ? cartItems.map(item => (
              <CartItem key={item.product.id} item={item} fetchCartItems={fetchCartItems} />
            ))
            : <tr>
              <td className='empty' colSpan='4'>Your cart is empty.</td>
            </tr>}
        </tbody>
      </CartTable>
      <FlexBox>
        <ButtonsContainer>
          <Link to='/list' onClick={() => scrollTo(0, 0)}>
            <button>Keep Shopping</button>
          </Link>
          <button
            onClick={() => handleDelete(allSelected)}
            disabled={selected.length === 0 || cartItems.length === 0}
          >Delete Selected</button>
          <Link to='/order'>
            <button
              onClick={() => handleOrder(false)}
              disabled={selected.length === 0 || cartItems.length === 0}
            >Order Selected</button>
          </Link>
        </ButtonsContainer>
        {
          cartItems.length > 0
          && <div className='subtotal-price'>
            <span>Subtotal : </span>
            &#8361; {subtotalPrice.toLocaleString()}
          </div>
        }
      </FlexBox>
    </CartListContainer >
  )
}