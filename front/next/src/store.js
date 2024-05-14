import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware'

const useStore = createStore(devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    token: null,
    setToken: (token) => set({ token }),
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    room: null,
    setRoom: (room) => set({ room }),
    playerData: [],
    setPlayerData: (playerData) => set({ playerData }),
    gameData: null,
    setGameData: (gameData) => set({ gameData }),
    localUserSocketId: [],
    setLocalUserSocketId: (localUserSocketId) => set({ localUserSocketId }),
    admin: Boolean,
    setAdmin: (admin) => set({ admin }),
})));

export default useStore;