import { setScrollY } from '../actions/scrollActions';

export const handleScrollY = () => (dispatch) => {
  const scrollY = window.scrollY;
  dispatch(setScrollY(scrollY));
};