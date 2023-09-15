import { CartItemContainer } from './CartItem.styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected, setAllSelected, setCartItems, setSubtotalPrice } from '../../redux/actions/cartActions';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selected = useSelector((state) => state.cart.selected);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [curQuantity, setCurQuantity] = useState(item.quantity);
  let accessToken = getAccessToken();

  useEffect(() => {
    accessToken = getAccessToken();
    setCurQuantity(item.quantity);
    fetchCartItems();
  }, [dispatch]);

  const handleCheckClick = (checkedItem) => {
    const updatedSelected = (selected.map(item => item.product.id).includes(checkedItem.product.id)) ? selected.filter(item => item.product.id !== checkedItem.product.id) : [...selected, checkedItem];
    dispatch(setSelected(updatedSelected));
    dispatch(setAllSelected(updatedSelected.length === cartItems.length));
    const newSubtotal = updatedSelected.reduce((total, item) => total + item.totalPrice, 0);
    dispatch(setSubtotalPrice(newSubtotal));
  }

  const fetchCartItems = () => {
    //FIXME: 24~25 삭제
    // console.log('subtotal: ', selected.reduce((total, item) => total + item.totalPrice, 0));
    // dispatch(setSubtotalPrice(selected.reduce((total, item) => total + item.totalPrice, 0)));

    axios.get(`${apiUrl}/cart/list`, { headers: { Authorization: accessToken } })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          dispatch(setCartItems(data));
          dispatch(setSubtotalPrice(data.reduce((total, item) => total + item.totalPrice, 0)));
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
          dispatch(setSelected(updateSelected));
          fetchCartItems();
        }
      })
      .catch((error) => {
        console.error(`Failed to update item's quantity: `, error);
      })
      .finally(() => {
        console.log(productId, newQuantity);
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
          <img src={item.product.img} alt='' />
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