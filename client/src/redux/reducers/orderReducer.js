import {
  SET_ORDER_NAME,
  SET_ORDER_ADDRESS,
  SET_ORDER_PHONE,
  SET_ORDER_REQUEST,
} from '../actions/orderActions';

const initialState = {
  orderName: '',
  orderAddress: '',
  orderPhone: '',
  orderRequest: '',
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_NAME:
      return {
        ...state,
        orderName: action.payload,
      };
    case SET_ORDER_ADDRESS:
      return {
        ...state,
        orderAddress: action.payload,
      };
    case SET_ORDER_PHONE:
      return {
        ...state,
        orderPhone: action.payload,
      };
    case SET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: action.payload,
      }
    default:
      return state;
  }
}