import { create } from 'zustand';

const useStore = create((set) => ({
    user: [],
    setUser: (user) => set({ user }),
    token: [],
    setToken: (token) => set({ token }),
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    publicRooms: [],
    setPublicRooms: (publicRooms) => set({ publicRooms }),
    accesibleRooms: [],
    setAccesibleRooms: (accesibleRooms) => set({ accesibleRooms }),
}));

export default useStore;