export const SET_ORDER_NAME = 'SET_ORDER_NAME';
export const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS';
export const SET_ORDER_PHONE = 'SET_ORDER_PHONE';
export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';

export const setOrderName = (orderName) => ({
  type: SET_ORDER_NAME,
  payload: orderName,
});

export const setOrderAddress = (orderAddress) => ({
  type: SET_ORDER_ADDRESS,
  payload: orderAddress,
});

export const setOrderPhone = (orderPhone) => ({
  type: SET_ORDER_PHONE,
  payload: orderPhone,
});

export const setOrderRequest = (orderRequest) => ({
  type: SET_ORDER_REQUEST,
  payload: orderRequest,
})