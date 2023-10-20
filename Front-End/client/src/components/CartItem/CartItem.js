import { CartItemContainer } from './CartItem.styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';
import { useCartStore } from '../../stores/cartStore';

export default function CartItem({ item }) {
  const { cart, selected, setCart, setSelected, setAllSelected, setSubtotalPrice } = useCartStore();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [curQuantity, setCurQuantity] = useState(item.quantity);
  let accessToken = getAccessToken();

  useEffect(() => {
    accessToken = getAccessToken();
    setCurQuantity(item.quantity);
    fetchCartItems();
  }, [cart]);

  const handleCheckClick = (checkedItem) => {
    const updatedSelected = (selected.map(item => item.product.id).includes(checkedItem.product.id)) ? selected.filter(item => item.product.id !== checkedItem.product.id) : [...selected, checkedItem];
    setSelected(updatedSelected);
    setAllSelected(updatedSelected.length === cart.length);
    const newSubtotal = updatedSelected.reduce((total, item) => total + item.totalPrice, 0);
    setSubtotalPrice(newSubtotal);
  }

  const fetchCartItems = () => {
    axios.get(`${apiUrl}/cart/list`, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setCart(data);
          setSubtotalPrice(data.reduce((total, item) => total + item.totalPrice, 0));
        }
      })
      .catch((error) => {
        console.error('Failed to load cart items: ', error);
      });
  }

  const handleQuantityChange = (productId, newQuantity) => {
    setCurQuantity(newQuantity);

    axios.patch(
      `${apiUrl}/cart/update/${productId}?quantity=${newQuantity}`,
      null,
      { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 200) {
          const updateSelected = selected.map((item) => {
            if (item.product.id === productId) {
              return {
                ...item,
                quantity: newQuantity,
              }
            }
            return item;
          });
          setSelected(updateSelected);
          fetchCartItems();
        }
      })
      .catch((error) => {
        console.error(`Failed to update item's quantity: `, error);
      })
  }

  return (
    <CartItemContainer>
      <td>
        <button className='checkbox-container' onClick={() => handleCheckClick(item)}>
          <input
            type='checkbox'
            checked={selected.map(item => item.product.id).includes(item.product.id)} />
        </button>
      </td>
      <td className='name'>
        <Link to={`/products/${item.product.id}`}>
          <img src={`${apiUrl}${item.product.img}`} alt='' />
          {item.product.productName}
        </Link>
      </td>
      <td className='price'>
        {(item.product.productPrice).toLocaleString()}
      </td>
      <td className='quantity'>
        <input
          type='number'
          min='1'
          max='99'
          value={curQuantity}
          onChange={(event) => handleQuantityChange(item.product.id, event.target.value)}
        />
      </td>
      <td className='total-price'>
        {(item.totalPrice).toLocaleString()}
      </td>
    </CartItemContainer>
  )
}