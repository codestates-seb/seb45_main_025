import { create } from 'zustand';

export const useListPageStore = create(set => ({
    listPage: 1,
    setListPage: state => set(() => ({ listPage: state })),
    setScrollPage: () => {
        set((state) => ({ listPage: state.listPage + 1}))
    }
}));

export const useListCurrentPageStore = create(set => ({
    listCurrentPage: 1,
    setListCurrentPage: state => set(() => ({ listCurrentPage: state})),
}));