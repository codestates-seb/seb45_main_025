// import { CartDataSample } from '../../common/data/CartDataSample';
import {
  SET_CART_ITEMS,
  SET_SELECTED,
  SET_ALL_SELECTED,
  SET_SUBTOTAL_PRICE,
} from '../actions/cartActions';

const initialState = {
  cartItems: [],
  selected: [],
  allSelected: true,
  subtotalPrice: 0,
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
    case SET_SUBTOTAL_PRICE:
      return {
        ...state,
        subtotalPrice: action.payload,
      }
    default:
      return state;
  }
}