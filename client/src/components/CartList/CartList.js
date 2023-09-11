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
import getAccessToken from '../../common/utils/getToken';

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selected = useSelector((state) => state.cart.selected);
  const allSelected = useSelector((state) => state.cart.allSelected);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchCartItems = () => {
    const accessToken = getAccessToken();
    console.log('Access Token: ', localStorage);
    // axios.get(`${apiUrl}/cart/list`, { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjoyLCJzdWIiOiJzb25AZ21haWwuY29tIiwiaWF0IjoxNjk0NDIxNzg5LCJleHAiOjE2OTQ0MjM1ODl9.vdRg6KgkigFQrgdoCoQVkHAYVQOCcS1IBPmL9IpO8i0" } })
    axios.get(`${apiUrl}/cart/list`, { headers: { Authorization: accessToken } })
      .then((response) => {
        dispatch(setCartItems(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Failed to load cart items: ', error);
      });
  }

  useEffect(() => {
    fetchCartItems();
    // dispatch(setAllSelected(cartItems.length === selected.length));
  }, [dispatch]);

  console.log(selected);

  const handleAllCheckClick = () => {
    if (allSelected) {
      dispatch(setSelected([]));
      dispatch(setAllSelected(false));
    } else {
      dispatch(setSelected(cartItems.map(item => item.product.id)));
      dispatch(setAllSelected(true));
    }
  };

  const handleOrder = (isAll) => {
    if (isAll) {
      dispatch(setSelected(cartItems.map(item => item.product.id)));
    }
    window.scroll(0, 0);
  }

  const handleDelete = (isAll) => {
    if (isAll) {
      axios.delete(`${apiUrl}/cart/clear`)
        .then((response) => {
          if (response.ok) {
            alert('delete all item success');
            dispatch(setCartItems(response.data));
            dispatch(setSelected([]));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let params = '';
      for (const id of selected) {
        params += `productIds=${id}&`;
      }
      params = params.slice(0, -1);
      const apiUrl = `${apiUrl}/cart/remove-multiple?${params}`;
      axios.delete(apiUrl, { data: { selected } })
        .then((response) => {
          if (response.ok) {
            alert('delete selected item success');
            dispatch(setCartItems(response.data));
            dispatch(setSelected([]));
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    window.scroll(0, 340);
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
            disabled={selected.length === 0}
          >Delete Selected</button>
          <Link to='/order'>
            <button
              onClick={() => handleOrder(false)}
              disabled={selected.length === 0}
            >Order Selected</button>
          </Link>
        </ButtonsContainer>
        {
          cartItems.length > 0
          && <div className='subtotal-price'>
            <span>Subtotal : </span>
            $ {cartItems
              .filter(item => selected.includes(item.product.id))
              .reduce((total, item) => total + item.totalPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        }
      </FlexBox>
    </CartListContainer >
  )
}