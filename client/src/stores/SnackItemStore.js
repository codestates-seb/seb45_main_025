import { create } from 'zustand';

const useSnackItemStore = create(set => ({
    snackItem: {
        id: 0,
        productName: '',
        category: '',
        content: '',
        productDescription: '',
        rawmaterial: '',
        precautions: '',
        manufacturer: '',
        productPrice: '',
        created_at: '',
        modified_at: '',
        likes: 0,
    },
    setSnackItem: state => set(() => ({ snackItem: state})),
    setLikeIncrease: () => 
      set(state => ({
        snackItem: {
            ...state.snackItem,
            likes: state.snackItem.likes + 1,
        },
      })),
    setLikeDecrease: () => 
      set(state => ({
        snackItem: {
          ...state.snackItem,
          likes: state.snackItem.likes - 1,
        },  
      })),
}));

export { useSnackItemStore };