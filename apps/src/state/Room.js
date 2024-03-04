import {create} from 'zustand';

// 상태 정의
const useRoomStore = create((set) => ({
    rooms: [],
    insertRoom: (room) => set((state) => ( [...state.rooms, room] )),
}));

// 컴포넌트에서 사용할 훅 내보내기
export default useRoomStore;
