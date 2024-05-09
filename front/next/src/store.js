import { create } from 'zustand';

const useStore = create((set) => ({
    user: [],
    setUser: (user) => set({ user }),
    token: [],
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
}));

export default useStore;