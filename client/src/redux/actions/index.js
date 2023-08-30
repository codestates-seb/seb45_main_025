import { SET_SCROLLED } from './types';

export const setScrolled = (isScrolled) => ({
  type: SET_SCROLLED,
  payload: isScrolled,
});