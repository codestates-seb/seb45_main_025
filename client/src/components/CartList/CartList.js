// 장바구니 추가  /cart/add/{{productId}}?quantity=개수
// 장바구니 조회  /cart/list 
// 장바구니 수정  /cart/update/{{productId}}?quantity=개수/
// 장바구니 삭제  /cart/remove/{{productId}}
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

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selected = useSelector((state) => state.cart.selected);
  const allSelected = useSelector((state) => state.cart.allSelected);

  const fetchCartItems = () => {
    axios.get('/cart/list')
      .then((response) => {
        dispatch(setCartItems(response.data));
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

  const handleQuantityChange = (productId, event) => {
    console.log(productId, event.target.value);

    axios.patch(`/cart/update/${productId}?quantity=${event.target.value}`)
      .then((response) => {
        dispatch(setCartItems(response.data));
      })
      .catch((error) => {
        console.error(`Failed to update item's quantity: `, error);
      })
  }

  const handleCheckClick = (productId) => {
    const updatedSelected = (selected.includes(productId)) ? selected.filter(id => id !== productId) : [...selected, productId];
    dispatch(setSelected(updatedSelected));
    dispatch(setAllSelected(updatedSelected.length === cartItems.length));
  }

  const handleOrder = (isAll) => {
    if (isAll) {
      dispatch(setSelected(cartItems.map(item => item.product.id)));
    }
    window.scroll(0, 0);
  }

  const handleDelete = (isAll) => {
    if (isAll) {
      axios.delete(`/cart/clear`)
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
      const apiUrl = `/cart/remove-multiple?${params}`;
      console.log(apiUrl);
      axios.delete('/cart/remove-multiple', { data: { selected } })
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
              <tr key={item.product.id}>
                <td>
                  <button className='checkbox-container' onClick={() => handleCheckClick(item.product.id)}>
                    <input
                      type='checkbox'
                      checked={selected.includes(item.product.id)} />
                  </button>
                </td>
                <td className='name'>
                  <Link to={`/products/${item.product.id}`}>
                    <img src={item.product.img} alt='' />
                    {item.product.productName}
                  </Link>
                </td>
                <td className='price'>
                  {item.product.productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className='quantity'>
                  <input
                    type='number'
                    placeholder={item.quantity}
                    min='1'
                    max='99'
                    onChange={(event) => handleQuantityChange(item.product.id, event)}
                  />
                </td>
                <td className='total-price'>
                  {(item.totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
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

          {/* <Link to='/order'>
            <button
              onClick={() => handleOrder(true)}
              disabled={cartItems.length === 0}
            >Order All</button>
          </Link> */}
          <button
            onClick={() => handleDelete(allSelected)}
            disabled={selected.length === 0}
          >Delete Selected</button>
          {/* <button
            onClick={() => handleDelete(allSelected)}
            disabled={cartItems.length === 0}
          >Empty Cart</button> */}
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
            $ {cartItems.filter(item => selected.includes(item.product.id)).reduce((total, item) => total + item.totalPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        }
      </FlexBox>
    </CartListContainer >
  )
}