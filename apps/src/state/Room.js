import {create} from 'zustand';

const useRoomStore = create((set) => ({
    rooms: [],
    insertRoom: (room) => set((state) => ([...state.rooms, room])),
}));

export default useRoomStore;
