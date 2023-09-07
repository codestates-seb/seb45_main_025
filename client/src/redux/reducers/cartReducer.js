import { CartDataSample } from '../../common/data/CartDataSample';
import {
  SET_CART_ITEMS,
  SET_SELECTED,
  SET_ALL_SELECTED,
} from '../actions/cartActions';

const initialState = {
  cartItems: CartDataSample,
  selected: CartDataSample.map(data => data.product.id),
  allSelected: true,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case SET_ALL_SELECTED:
      return {
        ...state,
        allSelected: action.payload,
      };
    default:
      return state;
  }
}