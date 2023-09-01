import { SET_SCROLLED } from '../actions/scrollActions';

const initialState = {
  scrolled: false,
};

export const scrollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCROLLED:
      return {
        ...state,
        scrolled: action.payload,
      };
    default:
      return state;
  }
}