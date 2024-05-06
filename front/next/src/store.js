import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware'

const useStore = createStore(devtools((set) => ({
    user: [],
    setUser: (user) => set({ user }),
    token: [],
    setToken: (token) => set({ token }),
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    admin: Boolean,
    setAdmin: (admin) => set({ admin }),
})));

// window.localStorage = useStore;

module.exports = useStore;