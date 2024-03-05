import {create} from 'zustand';

// 1. 상태 정의
export const useIdStore = create(set => ({
    id: sessionStorage.getItem('id') || '',
    setStoreId: (id) => {
        sessionStorage.setItem('id', id);
        set({id});
    },
    logout: () => {
        sessionStorage.removeItem('id');
        set({id: ''});
    }
}));
