import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Header from '../components/header';
import useStore from '../src/store';
import socket from '../services/sockets';
import { useRouter } from 'next/router';
import ErrorPopup from '../components/errorPopup';

function Rooms() {
    const router = useRouter();
    const session = useSession();
    const [showRooms, setShowRooms] = useState([]); // Mostrar salas públicas
    const [roomCode, setRoomCode] = useState(Array.from({ length: 6 }, () => '')); // Código de la sala
    const [codeErrorMessage, setCodeErrorMessage] = useState(null);
    const [incorrectCodeErrorMessage, setIncorrectCodeErrorMessage] = useState(null);
    var rooms = useStore.getState().rooms; // Salas

    //Mostrar salas pilladas desde el store en tiempo real (públicas) (sockets.js)
    useEffect(() => {
        const intervalId = setInterval(() => {
            const roomsFromStore = useStore.getState().rooms;
            rooms = roomsFromStore;
            let newShowRooms = [];
            roomsFromStore.forEach(room => {
                if (room.accesible == true && room.isPublic == true) {
                    newShowRooms.push(room);
                }
            });
            setShowRooms(newShowRooms);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (useStore.getState().room != null) {
            router.push('/lobby');
        }
    }, [useStore.getState().room]);

    // Unirse a la sala pública
    const addPublicRoom = (room) => {
        // Guardar información de la sala
        useStore.setState({ room: room });
        if (useStore.getState().user == null) {
            let userName = 'user' + Math.floor(Math.random() * 1000);
            useStore.setState({ user: { name: userName, image: '/images/profiles/default-NoLogin.png' } });
            let user = {
                name: userName,
                image: '/images/profiles/default-NoLogin.png'
            }
            socket.emit('joinRoom', { id: room.id, user: user });
        } else {
            let userStore = useStore.getState().user;
            let userLocalStorage = JSON.parse(localStorage.getItem('user'));
            if (userStore != null) {
                let user = {
                    name: userStore.name,
                    image: userStore.image
                }
                socket.emit('joinRoom', { id: room.id, user: user });
            } else if (userLocalStorage != null) {
                let user = {
                    name: userLocalStorage.name,
                    image: userLocalStorage.image
                }
                socket.emit('joinRoom', { id: room.id, user: user });
            }
        }
    };

    // Codigo de la sala
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    const handleInputChange = (index, event) => {
        const { value } = event.target;
        if (value.length > 1) return; // Prevent input of more than one character

        const newRoomCode = [...roomCode];
        newRoomCode[index] = value.toUpperCase();
        setRoomCode(newRoomCode);

        // Move to the next input if the current input is not empty
        if (value && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    // Unirse a la sala privada
    const addPrivateRoom = () => {
        let code = roomCode.join('');
        if (code.length < 6) {
            setCodeErrorMessage('Codi incomplet');
            setIncorrectCodeErrorMessage(null); // Reinicia el mensaje de error de código incorrecto
        } else {
            setCodeErrorMessage(null); // Reinicia el mensaje de error de código incompleto
            let found = false;
            rooms.forEach(room => {
                if (room.accessCode === code) {
                    found = true;
                    // Resto del código para unirse a la sala...
                    useStore.setState({ room: room });
                    if (useStore.getState().user == null) {
                        let userName = 'user' + Math.floor(Math.random() * 1000);
                        useStore.setState({ user: { name: userName, image: '/images/profiles/default-NoLogin.png' } });
                        let user = {
                            name: userName,
                            image: '/images/profiles/default-NoLogin.png'
                        }
                        socket.emit('joinRoom', { id: room.id, user: user });
                    } else {
                        let user = {
                            name: useStore.getState().user.name,
                            image: useStore.getState().user.image
                        }
                        socket.emit('joinRoom', { id: room.id, user: user });
                    }
                }
            });
            if (!found) {
                setIncorrectCodeErrorMessage('Codi incorrecte');
            } else {
                setIncorrectCodeErrorMessage(null);
            }
        }
    };

    // Navegación entre inputs
    const handleKeyDown = (index, e) => {
        const { key } = e;
        if (key === 'ArrowLeft' || key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = key === 'ArrowLeft' ? index - 1 : index + 1;
            if (nextIndex >= 0 && nextIndex < inputRefs.length) {
                inputRefs[nextIndex].current.focus();
            }
        } else if (key === 'Backspace') {
            e.preventDefault();
            let newRoomCode = [...roomCode];
            if (newRoomCode[index] !== '') {
                newRoomCode[index] = '';
                setRoomCode(newRoomCode);
            } else {
                for (let i = index - 1; i >= 0; i--) {
                    if (newRoomCode[i] !== '') {
                        newRoomCode[i] = '';
                        setRoomCode(newRoomCode);
                        inputRefs[i].current.focus();
                        break;
                    }
                }
            }
        } else if (key === 'Delete') {
            e.preventDefault();
            let newRoomCode = [...roomCode];
            for (let i = index; i < inputRefs.length - 1; i++) {
                newRoomCode[i] = newRoomCode[i + 1];
            }
            newRoomCode[inputRefs.length - 1] = '';
            setRoomCode(newRoomCode);
            inputRefs[index].current.focus();
        }
    };

    // Partida rápida
    const handleCreateRoom = () => {
        let user;
        if (useStore.getState().user == null) {
            let userName = 'user' + Math.floor(Math.random() * 1000);
            useStore.setState({ user: { name: userName, image: '/images/profiles/default-NoLogin.png' } });
            user = {
                name: userName,
                image: '/images/profiles/default-NoLogin.png'
            }

        } else {
            let userStore = useStore.getState().user;
            let userLocalStorage = JSON.parse(localStorage.getItem('user'));
            if (userStore != null) {
                user = {
                    name: userStore.name,
                    image: userStore.image
                }
            }

        }
        let data = { user: user };
        socket.emit('quickGame', data);
    };

    // Google Session
    useEffect(() => {
        if (!session.data) {
            // console.log(session);
        }
    }, [session]);

    // Google Sign Out
    function cerrarSesion() {
        signOut();
        if (!session.data) {
            // router.push('/');
        }
        // console.log(session.data);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-500 from-5% via-purple-600 via-60% to-white-500">
            <Header />
            <div className='lg:grid lg:grid-cols-2 mb-9 lg:gap-9'>
                {codeErrorMessage && <ErrorPopup type="error" message={codeErrorMessage} clearMessage={() => setCodeErrorMessage(null)} />}
                {incorrectCodeErrorMessage && <ErrorPopup type="error" message={incorrectCodeErrorMessage} clearMessage={() => setIncorrectCodeErrorMessage(null)} />}
                <div className="bg-white shadow-md rounded-lg p-4 flex-grow m-5 lg:max-w-[600px]">
                    <h2 className="text-lg font-semibold mb-4">Sales disponibles</h2>
                    <div className="bg-gray-100 rounded-lg p-4">
                        {showRooms.length > 0 && (
                            <div className="max-h-52 overflow-y-auto">
                                <ul>
                                    {showRooms.map(room => (
                                        <li className="mb-2 text-gray-800 hover:bg-gray-300 rounded-lg m-3 p-3" key={room.id} onClick={() => addPublicRoom(room)}>{room.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {showRooms.length == 0 && (
                            <p>No hi ha sales públiques disponibles</p>
                        )}
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-9  lg:max-w-[600px]'>
                    <Link href="/create">
                        <button className="text-white text-2xl p-5 font-bold rounded bg-green-500 hover:bg-green-700">CREAR SALA</button>
                    </Link>
                    <div className="grid grid-cols-7 gap-2 m-9">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={inputRefs[index]}
                                value={roomCode[index].toUpperCase()}
                                className="bg-white border border-gray-300 rounded-lg px-1 py-1 focus:outline-none h-12 text-gray-800 placeholder-gray-500 text-base text-center"
                                onChange={e => handleInputChange(index, e)}
                                onKeyDown={e => handleKeyDown(index, e)}
                            />
                        ))}
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mb-14 h-12 focus:outline-none flex items-center justify-center" onClick={() => addPrivateRoom()}>
                            Accedir
                        </button>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-9'>
                <button className='text-white text-2xl p-5 font-bold rounded-lg bg-red-500 hover:bg-red-700' onClick={handleCreateRoom}>
                    Partida rápida
                    <p className='text-sm'>Mapes originals</p>
                </button>
            </div>
        </div>
    );
}

export default Rooms;