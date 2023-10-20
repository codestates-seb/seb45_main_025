import { create } from 'zustand';

export const useOrderStore = create(set => ({
  inputName: '',
  inputAddress: '',
  inputPhone: '',
  inputRequest: '',
  setInputName: (data) =>
    set({ inputName: data }),
  setInputAddress: (data) =>
    set({ inputAddress: data }),
  setInputPhone: (data) =>
    set({ inputPhone: data }),
  setInputRequest: (data) =>
    set({ inputRequest: data }),
}));
