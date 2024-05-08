import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FaCheck } from "react-icons/fa6";
import Header from '../components/header';
import useStore from '../src/store';
import socket from '../services/sockets';
import { useRouter } from 'next/router';

function Rooms() {
    const router=useRouter();
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

    // Unirse a la sala pública
    const addPublicRoom = (room) => {
        // Guardar información de la sala
        useStore.setState({ room: room });
        console.log('Try room join: ', room.id);
        if (useStore.getState().user.length == 0){
            let userName = 'user' + Math.floor(Math.random() * 1000);
            useStore.setState({ user: { name: userName } });
            console.log('UserName: ', useStore.getState().user.name);
            let buildData={"id": room.id, "username": userName};
            socket.emit('joinRoom',buildData) ;

            
        } else {
            let userName = useStore.getState().user[0] || localStorage.getItem('user');
            console.log('UserName: ', useStore.getState().user[0]);
            let buildData={"id": room.id, "username": userName}
            socket.emit('joinRoom', buildData);

            
        }
        // socket.emit('joinRoom', room.id);
        router.push('/lobby');
    };

    // Codigo de la sala
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    // Estado del código de la sala
    const handleInputChange = (index, event) => {
        const { value } = event.target;
        const newRoomCode = [...roomCode];
        newRoomCode[index] = value.toUpperCase(); // Convierte a mayúsculas
        setRoomCode(newRoomCode);
    };

    // Unirse a la sala privada
    const addPrivateRoom = () => {
        let code = roomCode.join('');
        console.log(code);
        console.log(rooms);
        if (code.length < 6) {
            alert('El codi no està sencer')
        } else {
            console.log('Try room join: ', code);
            rooms.forEach(room => {
                if (room.accesCode == code) {
                    // Guardar información de la sala
                    useStore.setState({ room: room });
                    console.log('Room found: ', room.id);
                    if ( useStore.getState().user == null ){
                        let userName = 'user' + Math.floor(Math.random() * 1000);
                        useStore.setState({ user: { name: userName } });
                        console.log('UserName: ', useStore.getState().user.name);
                        // socket.emit('joinRoom', room.id, userName);
                        // window.location.href = '/lobby';
                    } else {
                        console.log('UserName: ', useStore.getState().user.name);
                        // socket.emit('joinRoom', room.id, useStore.getState().user.name);
                        // window.location.href = '/lobby';
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
                // Si estamos en el primer input y está vacío, enfocamos el input anterior si existe
                if (inputRefs[index - 1]) {
                    inputRefs[index - 1].current.focus();
                }
            } else {
                inputRefs[index].current.value = ''; // Eliminar el carácter
            }
        } else if (key == 'Delete') {
            if (inputRefs[index].current.value == '' && index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            } else {
                // Mover los caracteres hacia atrás y limpiar el último campo
                for (let i = index; i < inputRefs.length - 1; i++) {
                    inputRefs[i].current.value = inputRefs[i + 1].current.value;
                }
                inputRefs[inputRefs.length - 1].current.value = '';
            }
        }
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
            // window.location.href = '/';
        }
        console.log(session.data);
    }

    return (
        <div> 
            <Header />
            <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
                <div className="flex flex-col w-full md:w-4/12 justify-center md:justify-start">
                    <div className="bg-white shadow-md rounded-lg p-4 flex-grow">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-4">Salas Disponibles</h2>
                            <div className="max-h-52 overflow-y-auto">
                                <ul>
                                    {showRooms.map(room => (
                                        <li className="mb-2 text-gray-800 hover:bg-gray-300 rounded-lg m-3 p-3" onClick={() => addPublicRoom(room)}>{room.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-0 md:w-32"></div>

                <div className="rounded-lg p-4 flex flex-col w-full md:w-3/12 justify-center items-center md:items-start mt-4 md:mt-0">
                    <div className='flex justify-center items-center md:justify-start'>
                        <Link href="/create">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded my-14 h-12 w-32 mx-40 focus:outline-none">CREAR SALA</button>
                        </Link>
                    </div>
                    {/* Codigo de la sala */}
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={inputRefs[index]}
                                value={roomCode[index].toUpperCase()}
                                className="bg-white border border-gray-300 rounded-lg px-1 py-1 focus:outline-none h-12 text-gray-800 placeholder-gray-500 text-base text-center caret-transparent"
                                onChange={e => handleInputChange(index, e)}
                                onKeyDown={e => handleKeyDown(index, e)}
                            />
                        ))}
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mb-14 h-12 focus:outline-none flex items-center justify-center" onClick={() => addPrivateRoom()}>
                            <FaCheck className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rooms;