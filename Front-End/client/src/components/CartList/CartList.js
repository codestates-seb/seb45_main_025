import {
  CartListContainer,
  CartTable,
  ButtonsContainer,
  FlexBox
} from './CartList.styled';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import CartItem from '../CartItem/CartItem';
import getAccessToken from '../../common/utils/getToken';
import { useCartStore } from '../../stores/cartStore';

export default function CartList() {
  const { cart, selected, allSelected, subtotalPrice, setCart, setSelected, setAllSelected, setSubtotalPrice } = useCartStore();

  const apiUrl = process.env.REACT_APP_API_URL;
  let accessToken = getAccessToken();
  useEffect(() => {
    accessToken = getAccessToken();
    fetchCartItems();
    setAllSelected(cart.length === selected.length);
  }, [cart]);

  const fetchCartItems = () => {
    axios.get(`${apiUrl}/cart/list`, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setCart(data);
          setSelected(data);
          setAllSelected(true);
          setSubtotalPrice(data.reduce((total, item) => total + item.totalPrice, 0))
        }
      })
      .catch((error) => {
        console.error('Failed to load cart items', error);
      });
  }

  const handleAllCheckClick = () => {
    if (allSelected) {
      setSelected([]);
      setAllSelected(false);
      setSubtotalPrice(0);
    } else {
      setSelected(cart);
      setAllSelected(true);
      setSubtotalPrice(cart.reduce((total, item) => total + item.totalPrice, 0));
    }
  };

  const handleOrder = () => {
    window.scroll(0, 0);
  }

  const handleDelete = (isAll) => {
    if (isAll) {
      axios.delete(`${apiUrl}/cart/clear`, { headers: { Authorization: accessToken } })
        .then((response) => {
          if (response.status === 204) {
            fetchCartItems();
          }
        })
        .catch((error) => {
          console.error('Failed to delete cart items', error);
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
          console.error('Failed to delete cart items', error);
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
                  checked={allSelected && cart.length > 0}
                  disabled={cart.length === 0} />
              </button>
            </th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0
            ? cart.map(item => (
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
            disabled={selected.length === 0 || cart.length === 0}
          >Delete Selected</button>
          <Link to='/order'>
            <button
              onClick={() => handleOrder(false)}
              disabled={selected.length === 0 || cart.length === 0}
            >Order Selected</button>
          </Link>
        </ButtonsContainer>
        {
          cart.length > 0
          && <div className='subtotal-price'>
            <span>Subtotal : </span>
            &#8361; {subtotalPrice.toLocaleString()}
          </div>
        }
      </FlexBox>
    </CartListContainer >
  )
}