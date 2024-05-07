import { create } from 'zustand';

const useStore = create((set) => ({
    user: Array,
    setUser: (user) => set({ user }),
    token: String,
    setToken: (token) => set({ token }),
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    room: [],
    setRoom: (room) => set({ room })
}));

export default useStore;