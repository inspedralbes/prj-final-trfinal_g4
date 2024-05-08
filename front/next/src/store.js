import { create } from 'zustand';

const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    token: null,
    setToken: (token) => set({ token }),
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    room: null,
    setRoom: (room) => set({ room })
}));

export default useStore;
