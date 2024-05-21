import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FaCheck } from "react-icons/fa6";
import Header from '../components/header';
import useStore from '../src/store';
import socket from '../services/sockets';
import { useRouter } from 'next/router';

function Rooms() {
    const router = useRouter();
    const session = useSession();
    const [showRooms, setShowRooms] = useState([]); // Mostrar salas públicas
    const [roomCode, setRoomCode] = useState(Array.from({ length: 6 }, () => '')); // Código de la sala
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
            useStore.setState({ user: { name: userName } });
            let user = {
                name: userName,
                image: '/images/random-game.png'
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
        const newRoomCode = [...roomCode];
        newRoomCode[index] = value.toUpperCase();
        setRoomCode(newRoomCode);
    };

    // Unirse a la sala privada
    const addPrivateRoom = () => {
        let code = roomCode.join('');
        if (code.length < 6) {
            alert('El codi no està sencer')
        } else {
            rooms.forEach(room => {
                if (room.accessCode == code) {
                    useStore.setState({ room: room });
                    if (useStore.getState().user == null) {
                        let userName = 'user' + Math.floor(Math.random() * 1000);
                        useStore.setState({ user: { name: userName } });
                        let user = {
                            name: userName,
                            image: '/images/random-game.png'
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
        }
    };

    // Navegación entre inputs
    const handleKeyDown = (index, e) => {
        const { key } = e;
        if (key == 'ArrowLeft' || key == 'ArrowRight') {
            e.preventDefault();
            const nextIndex = key == 'ArrowLeft' ? index - 1 : index + 1;
            if (nextIndex >= 0 && nextIndex < inputRefs.length) {
                inputRefs[nextIndex].current.focus();
            }
        } else if (key == 'Backspace') {
            if (index > 0 && inputRefs[index].current.value == '') {
                inputRefs[index - 1].current.focus();
            } else if (index == 0 && inputRefs[index].current.value == '') {
                if (inputRefs[index - 1]) {
                    inputRefs[index - 1].current.focus();
                }
            } else {
                inputRefs[index].current.value = '';
            }
        } else if (key == 'Delete') {
            if (inputRefs[index].current.value == '' && index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            } else {
                for (let i = index; i < inputRefs.length - 1; i++) {
                    inputRefs[i].current.value = inputRefs[i + 1].current.value;
                }
                inputRefs[inputRefs.length - 1].current.value = '';
            }
        }
    };

    // Partida rápida
    const handleCreateRoom = () => {
        let user;
        if (useStore.getState().user == null) {
            let userName = 'user' + Math.floor(Math.random() * 1000);
            useStore.setState({ user: { name: userName } });
            user = {
                name: userName,
                image: '/images/random-game.png'
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
        let data = {user: user};
        socket.emit('quickGame', data);
        // let roomInfo = {
        //     name: 'Partida ràpida',
        //     public: true,
        //     mode: 'original',
        //     maps: ['/images/original-map1.png', '/images/original-map2.png', '/images/original-map3.png', '/images/original-map4.png', '/images/original-map5.png', '/images/original-map6.png']
        // };
        // if (useStore.getState().user == null) {
        //     let userName = 'user' + Math.floor(Math.random() * 1000);
        //     useStore.setState({ user: { name: userName } });
        //     let user = {
        //         name: userName,
        //         image: '/images/random-game.png'
        //     }
        //     socket.emit('createRoom', { addRoom: roomInfo, userAdmin: user });
        // } else {
        //     let userStore = useStore.getState().user;
        //     let userLocalStorage = JSON.parse(localStorage.getItem('user'));
        //     if (userStore != null) {
        //         let user = {
        //             name: userStore.name,
        //             image: userStore.image
        //         }
        //         socket.emit('createRoom', { addRoom: roomInfo, userAdmin: user });
        //     } else if (userLocalStorage != null) {
        //         let user = {
        //             name: userLocalStorage.name,
        //             image: userLocalStorage.image
        //         }
        //         socket.emit('createRoom', { addRoom: roomInfo, userAdmin: user });
        //     }
        // }
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
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-500">
            <Header />
            <div className='lg:grid lg:grid-cols-2 mb-9 lg:gap-9'>
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