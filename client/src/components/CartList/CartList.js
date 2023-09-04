// TODO: quantity +, -버튼으로 수정 가능하게 (1일땐 - 안되게)
// DONE: 장바구니 리스트 redux로 상태관리하기 (수량, 선택여부도)
// DONE: 선택 상품 상태관리 추가
// TODO: 상품 수량, 체크 여부는 클라이언트에서 관리하는지? 
// 주문할 때랑, 삭제할 때만 API요청해야할듯
// 수량 변하는 것도 api요청해야될거같기도. 그럼 체크 여부만 클라이언트에서 상태관리하고, 
// 주문할 때 전달
// TODO: 각 상품 삭제, 좋아요 버튼 추가 (삭제 버튼 없어도 될거같음)
import { CartListContainer, CartTable, ButtonsContainer } from './CartList.styled';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCartItems,
  setSelected,
  setAllSelected
} from '../../redux/actions/cartActions';

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selected = useSelector((state) => state.cart.selected);
  const allSelected = useSelector((state) => state.cart.allSelected);

  useEffect(() => {
    dispatch(setAllSelected(cartItems.length === selected.length));
  }, [cartItems]);

  console.log(selected);

  const handleAllCheckClick = () => {
    if (allSelected) {
      dispatch(setSelected([]));
      dispatch(setAllSelected(false));
    } else {
      dispatch(setSelected(cartItems.map(item => item.product_id)));
      dispatch(setAllSelected(true));
    }
  };

  const handleCheckClick = (product_id) => {
    const updatedSelected = (selected.includes(product_id)) ? selected.filter(id => id !== product_id) : [...selected, product_id];
    dispatch(setSelected(updatedSelected));
    dispatch(setAllSelected(updatedSelected.length === cartItems.length));
  }

  const handleOrder = (isAll) => {
    if (isAll) {
      dispatch(setSelected(cartItems.map(item => item.product_id)));
    }
    window.scroll(0, 0);
  }

  const handleDelete = (isAll) => {
    if (isAll) {
      dispatch(setCartItems([]));
      dispatch(setSelected([]));
    } else {
      dispatch(setCartItems(cartItems.filter(item => !selected.includes(item.product_id))));
      dispatch(setSelected([]));
    }
    window.scroll(0, 320);
  }

  return (
    <CartListContainer>
      <CartTable>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={allSelected && cartItems.length > 0}
                onClick={handleAllCheckClick}
                disabled={cartItems.length === 0} />
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
              <tr key={item.product_id}>
                <td><input type='checkbox' checked={selected.includes(item.product_id)} onClick={() => handleCheckClick(item.product_id)}></input></td>
                <td className='name'><img src={item.product_img} alt='' />{item.product_name}</td>
                <td className='price'>{item.product_price.toLocaleString()}</td>
                <td className='quantity'>{item.quantity}</td>
                <td className='total-price'>{(Number(item.product_price) * Number(item.quantity)).toLocaleString()}</td>
              </tr>
            ))
            : <tr>
              <td className='empty' colSpan='4'>Your cart is empty.</td>
            </tr>}
        </tbody>
      </CartTable>

      {cartItems.length > 0
        && <div className='subtotal-price'>
          <span>Subtotal : </span>
          $ {cartItems.filter(item => selected.includes(item.product_id)).reduce((total, item) => total + item.product_price * item.quantity, 0).toLocaleString()}
        </div>
      }
      <ButtonsContainer>
        <Link to='/products'>
          <button>
            Keep Shopping
          </button>
        </Link>
        <Link to='/order'>
          <button
            onClick={() => handleOrder(false)}
            disabled={selected.length === 0}
          >
            Order Selected
          </button>
        </Link>
        <Link to='/order'>
          <button
            onClick={() => handleOrder(true)}
            disabled={cartItems.length === 0}
          >
            Order All
          </button>
        </Link>
        <button
          onClick={() => handleDelete(false)}
          disabled={selected.length === 0}
        >
          Delete Selected
        </button>
        <button
          onClick={() => handleDelete(true)}
          disabled={cartItems.length === 0}
        >
          Empty Cart
        </button>
      </ButtonsContainer>
    </CartListContainer >
  )
}