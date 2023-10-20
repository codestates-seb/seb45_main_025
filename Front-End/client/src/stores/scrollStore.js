import { create } from 'zustand';

export const useScrollStore = create(set => ({
  scrollY: 0,
  setScrollY: (data) =>
    set({ scrollY: data }),
}));