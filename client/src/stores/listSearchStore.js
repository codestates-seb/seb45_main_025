import { create } from "zustand";

export const useSearchTextStore = create(set => ({
    searchText: '',
    setSearchText: state => set(() => ({ searchText: state})),
}));

export const useSearchIsUpdateStore = create(set => ({
    searchIsUpdate: false,
    setSearchIsUpdate: state => set(() => ({ searchIsUpdate: state})),
}));