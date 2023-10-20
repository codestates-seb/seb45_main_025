import { create } from 'zustand';
import { CartDataSample } from '../common/data/CartDataSample';

export const useCartStore = create(set => ({
  cart: CartDataSample,
  selected: CartDataSample,
  allSelected: true,
  subtotalPrice: CartDataSample.reduce((total, item) => total + item.totalPrice, 0),
  //cart: [],
  //selected: [],
  //allSelected: true,
  //subtotalPirce: 0,
  setCart: (data) =>
    set({ cartData: data }),
  setSelected: (data) =>
    set({ selected: data }),
  setAllSelected: (data) =>
    set({ allSelected: data }),
  setSubtotalPrice: (data) =>
    set({ subtotalPrice: data }),
}));
