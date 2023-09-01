// TODO: quantity +, -버튼으로 수정 가능하게 (1일땐 - 안되게)
// TODO: 장바구니 리스트 redux로 상태관리하기 (수량, 선택여부도)
// TODO: 선택 상품 상태관리 추가
// TODO: 상품 수량, 체크 여부는 클라이언트에서 관리하는지? 주문할 때랑, 삭제할 때만 API요청해야할듯
//        수량 변하는 것도 api요청해야될거같기도. 그럼 체크 여부만 클라이언트에서 상태관리하고, 주문할 때 전달
// TODO: 각 상품 삭제, 좋아요 버튼 추가
import { CartListContainer, CartTable, ButtonsContainer } from './CartList.styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartDataSample } from '../../common/data/CartDataSample';


export default function CartList() {
  const [cartData, setCartData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    // TODO: setCartData API요청으로 처리 [GET] /products/cart
    setCartData(CartDataSample);
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      setSelected(cartData.map(data => data.product_id));
      setIsAllSelected(true);
    }
  }, [cartData]);

  const handleAllCheckClick = () => {
    if (isAllSelected) {
      setSelected([]);
      setIsAllSelected(false);
    } else {
      setSelected(cartData.map(data => data.product_id));
      setIsAllSelected(true);
    }
  };


  console.log(selected);

  const handleCheckClick = (product_id) => {
    const updatedSelected = (selected.includes(product_id)) ? selected.filter(id => id !== product_id) : [...selected, product_id];
    setSelected(updatedSelected);
    setIsAllSelected(updatedSelected.length === cartData.length);
  }


  const handleSelectedDelete = () => {
    setCartData(cartData.filter(data => !selected.includes(data.product_id)));
  }


  return (
    <CartListContainer>
      <CartTable>
        <thead>
          <tr>
            <th><input type='checkbox' checked={isAllSelected} onClick={handleAllCheckClick} /></th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartData.length > 0
            ? cartData.map(data => (
              <tr key={data.product_id}>
                <td><input type='checkbox' checked={selected.includes(data.product_id)} onClick={() => handleCheckClick(data.product_id)}></input></td>
                <td className='name'><img src={data.product_img} alt='' />{data.product_name}</td>
                <td className='price'>{data.product_price.toLocaleString()}</td>
                <td className='quantity'>{data.quantity}</td>
                <td className='total-price'>{(Number(data.product_price) * Number(data.quantity)).toLocaleString()}</td>
              </tr>
            ))
            : <tr>
              <td className='empty' colSpan='4'>Your cart is empty.</td>
            </tr>}
        </tbody>
      </CartTable>

      {cartData.length > 0
        && <div className='subtotal-price'>
          <span>Subtotal : </span>
          $ {cartData.filter(data => selected.includes(data.product_id)).reduce((total, item) => total + item.product_price * item.quantity, 0).toLocaleString()}
        </div>
      }
      <ButtonsContainer>
        <Link to='/products'>
          <button>
            계속 쇼핑하기
          </button>
        </Link>
        <Link to='/order'>
          <button>
            선택상품 주문하기
          </button>
        </Link>
        <button onClick={() => {
          handleSelectedDelete();
          window.scroll(0, 480);
        }}>
          선택상품 삭제하기
        </button>
        <button onClick={() => {
          setCartData([]);
          window.scroll(0, 480);
        }}>
          장바구니 비우기
        </button>
      </ButtonsContainer>


    </CartListContainer>
  )
}