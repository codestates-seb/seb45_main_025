import { create } from "zustand";

export const useSearchTextStore = create(set => ({
    searchText: '',
    setSearchText: state => set(() => ({ searchText: state})),
}));

export const useSearchCategoryStore = create(set => ({
    searchCategory: 'category',
    setSearchCategory: state => set(() => ({ searchCategory: state })),
}));

export const useSearchSelectedCategoryStore = create(set => ({
    searchSelectedCategory: 'all',
    setSearchSelectedCategory: state => set(() => ({ searchSelectedCategory: state })),
}));

export const useSearchIsUpdateStore = create(set => ({
    searchIsUpdate: false,
    setSearchIsUpdate: state => set(() => ({ searchIsUpdate: state})),
}));