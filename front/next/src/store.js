import { create } from 'zustand';

const useStore = create((set) => ({
    user: [],
    setUser: (user) => set({ user }),
    token: [],
    setToken: (token) => set({ token }),
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    accessCodes: []
}));

export default useStore;