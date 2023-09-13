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
  setAllSelected
} from '../../redux/actions/cartActions';
import axios from 'axios';
import CartItem from '../CartItem/CartItem';
// import getAccessToken from '../../common/utils/getToken';

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selected = useSelector((state) => state.cart.selected);
  const allSelected = useSelector((state) => state.cart.allSelected);
  const apiUrl = process.env.REACT_APP_API_URL;
  // const accessToken = getAccessToken();
  const accessToken = localStorage.getItem('access_token');
  console.log(accessToken);

  // FIXME: 장바구니 post 요청 테스트 용. 나중에 삭제
  const addHandler = () => {
    axios.post(`${apiUrl}/cart/add/1?quantity=2`, { headers: { Authorization: accessToken } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchCartItems = () => {
    axios.get(`${apiUrl}/cart/list`, { headers: { Authorization: accessToken } })
      .then((response) => {
        dispatch(setCartItems(response.data));
        dispatch(setSelected(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Failed to load cart items: ', error);
      });
  }

  useEffect(() => {
    fetchCartItems();
    dispatch(setAllSelected(cartItems.length === selected.length));
  }, [dispatch]);

  console.log(selected);

  const handleAllCheckClick = () => {
    if (allSelected) {
      dispatch(setSelected([]));
      dispatch(setAllSelected(false));
    } else {
      dispatch(setSelected(cartItems));
      dispatch(setAllSelected(true));
    }
  };

  const handleOrder = () => {
    window.scroll(0, 0);
  }

  const handleDelete = (isAll) => {
    if (isAll) {
      axios.delete(`${apiUrl}/cart/clear`, { headers: { Authorization: accessToken } })
        .then((response) => {
          if (response.ok) {
            alert('delete all item success');
            fetchCartItems();
            // dispatch(setCartItems(response.data));
            dispatch(setSelected([]));
            dispatch(setAllSelected(false));
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
      const removeCartUrl = `${removeCartUrl}/cart/remove-multiple?${params}`;
      axios.delete(removeCartUrl, { headers: { Authorization: accessToken } })
        .then((response) => {
          if (response.ok) {
            alert('delete selected item success');
            fetchCartItems();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    dispatch(setSelected([]));
    dispatch(setAllSelected(false));
    window.scroll(0, 340);
  }

  return (
    <CartListContainer>
      <button onClick={addHandler}>ADD</button>
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
              <CartItem key={item.product.id} item={item} />
            ))
            : <tr>
              <td className='empty' colSpan='4'>Your cart is empty.</td>
            </tr>}
        </tbody>
      </CartTable>
      <FlexBox>
        <ButtonsContainer>
          <Link to='/products'>
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
            $ {cartItems
              .filter(item => selected.map(el => el.product.id).includes(item.product.id))
              .reduce((total, item) => total + item.totalPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        }
      </FlexBox>
    </CartListContainer >
  )
}