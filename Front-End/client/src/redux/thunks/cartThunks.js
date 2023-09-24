import { setCartItems } from '../actions/cartActions';
import { CartDataSample } from '../../common/data/CartDataSample';

export const handleCart = () => (dispatch) => {
  const data = CartDataSample;
  dispatch(setCartItems(data));
}