import React, { useState, useEffect } from 'react';
import Fases from '../components/fases';
import Header from '../components/header';
import socket from '../services/sockets';
import useStore from '../src/store';
import { useRouter } from 'next/router';
import ErrorPopup from '../components/errorPopup';

const Create = () => {
    const [roomName, setRoomName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [gameMode, setGameMode] = useState('');
    const [selectedImages, setSelectedImages] = useState([
        { id: null, imageUrl: '/images/random-game.png' },
        { id: null, imageUrl: '/images/random-game.png' },
        { id: null, imageUrl: '/images/random-game.png' }
    ]);
    const [rooms, setRooms] = useState(useStore.getState().rooms);
    const [popupMessage, setPopupMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const roomsFromStore = useStore.getState().rooms;
            setRooms(roomsFromStore);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (useStore.getState().room != null) {
            router.push('/lobby');
        }
    }, [useStore.getState().room]);

    function generateAccessCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let accessCode = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            accessCode += characters[randomIndex];
        }
        return accessCode;
    }

    const handleCreateRoom = () => {
        const roomInfo = {
            name: roomName,
            public: isPublic,
            mode: gameMode,
            maps: selectedImages.filter(image => image.imageUrl != '/images/random-game.png').map(image => ({ id: image.id, imageUrl: image.imageUrl }))
        };
    
        if (roomInfo.name == '' || roomInfo.mode == '' || (roomInfo.mode == 'Mapes de la comunitat' && roomInfo.maps.length < 3) ) {
            setPopupMessage('Falten dades per omplir.');
            return;
        } else {
            let accessCode;
            if (!isPublic) {
                do {
                    accessCode = generateAccessCode();
                } while (rooms.some((room) => room.accessCode == accessCode));
                roomInfo.accessCode = accessCode;
            }
            if (useStore.getState().user == null) {
                let userName = 'user' + Math.floor(Math.random() * 1000);
                useStore.setState({ user: { name: userName, image: '/images/profiles/default-NoLogin.png' } });
                let user = {
                    name: userName,
                    image: '/images/profiles/default-NoLogin.png'
                };
                socket.emit('createRoom', { addRoom: roomInfo, userAdmin: user });
            } else {
                let userStore = useStore.getState().user;
                let userLocalStorage = JSON.parse(localStorage.getItem('user'));
                if (userStore != null) {
                    let user = {
                        name: userStore.name,
                        image: userStore.image
                    };
                    socket.emit('createRoom', { addRoom: roomInfo, userAdmin: user });
                } else if (userLocalStorage != null) {
                    let user = {
                        name: userLocalStorage.name,
                        image: userLocalStorage.image
                    };
                    socket.emit('createRoom', { addRoom: roomInfo, userAdmin: user });
                }
            }
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 from-5% via-red-700 via-60% to-yellow-500 p-8">
            <Header />
            <div className="flex flex-col justify-center items-center w-full sm:w-1/3 mb-8 mt-9 pt-9">
                    <h1 className="text-white text-4xl font-bold mb-4">Crear sala</h1>
                    <div className="w-full bg-white rounded-lg p-4 mb-3">
                        <label htmlFor="roomName" className="block text-gray-700 font-semibold mb-2">Nom de la Sala:</label>
                        <input
                            id="roomName"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {isPublic ? 'Sala Pública' : 'Sala Privada'}
                                </span>
                            </label>
                        </div>
                        <label htmlFor="gameMode" className="block text-gray-700 font-semibold mb-2">Mode de joc:</label>
                        <select
                            id="gameMode"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={gameMode}
                            onChange={(e) => setGameMode(e.target.value)}
                        >
                            <option value="">Seleccionar mode de joc...</option>
                            <option value="Mapes originals">Mapes originals</option>
                            <option value="Mapes de la comunitat">Mapes de la comunitat</option>
                            <option value="Aleatori">Aleatori</option>
                        </select>
                    </div>
                    {popupMessage && <ErrorPopup type={popupMessage === 'Faltan datos por rellenar' ? 'incomplete' : 'error'} message={popupMessage} />}
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-6 py-2 focus:outline-none" onClick={handleCreateRoom}>
                        Crear Sala
                    </button>
                </div>
                
                { gameMode == 'Mapes de la comunitat' && (
                    <Fases selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
                )}
        </div>
    );
};

export default Create;
