import { create } from "zustand";

export const useSearchTextStore = create(set => ({
    searchText: '',
    setSearchText: state => set(() => ({ searchText: state})),
}));

export const useSearchSelectedStore = create(set => ({
    searchSelected: 'search',
    setSearchSelected: state => set(() => ({ searchSelected: state })),
}));

export const useSearchApiStore = create(set => ({
    searchApi: 'productName',
    setSearchApi: state => set(() => ({ searchApi: state })),
}));

export const useSearchIsUpdateStore = create(set => ({
    searchIsUpdate: false,
    setSearchIsUpdate: state => set(() => ({ searchIsUpdate: state})),
}));