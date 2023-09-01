import { setScrolled } from '../actions/scrollActions';

export const handleScroll = () => (dispatch) => {
  const isScrolled = window.scrollY > 0;
  dispatch(setScrolled(isScrolled));
};