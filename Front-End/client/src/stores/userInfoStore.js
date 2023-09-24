import { create } from 'zustand';

const useUserInfoStore = create(set => ({
    userInfo: {
        name: '',
        nick: '',
        gender: '',
        birth: '',
    },
    setUserInfo: state => set(() => ({ userInfo: state })),
}));

export { useUserInfoStore };