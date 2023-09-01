export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const SET_SELECTED = 'SET_SELECTED';
export const SET_ALL_SELECTED = 'SET_ALL_SELECTED';

export const setCartItems = (cartItems) => ({
  type: SET_CART_ITEMS,
  payload: cartItems,
});

export const setSelected = (selected) => ({
  type: SET_SELECTED,
  payload: selected,
});

export const setAllSelected = (allSelected) => ({
  type: SET_ALL_SELECTED,
  payload: allSelected,
});
