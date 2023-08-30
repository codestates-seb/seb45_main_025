import { SET_SCROLLED } from '../actions/types';

const initialState = {
  scrolled: false,
};

const scrollReducer = (state = initialState, action) => {
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

export default scrollReducer;