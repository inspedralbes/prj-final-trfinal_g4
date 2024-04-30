import React, { useRef, useEffect, useState, use } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FaCheck } from "react-icons/fa6";
import useStore from '../src/store';
import socket from '../services/sockets';

function Rooms() {
    const session = useSession();
    const [rooms, setRooms] = useState(useStore.getState().rooms);
    const [ showRooms, setShowRooms ] = useState([]);

    //Mostrar salas pilladas desde el store en tiempo real (públicas) (sockets.js)
    useEffect(() => {
        const intervalId = setInterval(() => {
            const roomsFromStore = useStore.getState().rooms;
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

    const clickAddRoom = (id) => {
        console.log('Try room join: ', id);
        socket.emit('joinRoom', id);
        // window.location.href = '/lobby';
    };

    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

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
            window.location.href = '/';
        }
        console.log(session.data);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
            {
                !session.data ? (
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={cerrarSesion}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg py-2 px-4"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : null
            }
            <div className="flex w-4/12">
                <div className="bg-white shadow-md rounded-lg p-4 flex-grow">
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">Salas Disponibles</h2>
                        <div className="max-h-52 overflow-y-auto">
                            <ul>
                            {showRooms.map(room => (
                                    <li className="mb-2 text-gray-800 hover:bg-gray-300 rounded-lg m-3 p-3" onClick={()=>clickAddRoom(room.id)}>{room.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-32"></div>

            <div className="rounded-lg p-4 flex flex-col w-3/12">
                <Link href="/create">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded my-14 h-12 w-32 mx-40 focus:outline-none">CREAR SALA</button>
                </Link>
                {/* Codigo de la sala */}
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={inputRefs[index]}
                            className="bg-white border border-gray-300 rounded-lg px-1 py-1 focus:outline-none h-12 text-gray-800 placeholder-gray-500 text-base text-center caret-transparent"
                            onChange={e => handleChange(index, e)}
                            onKeyDown={e => handleKeyDown(index, e)}
                        />
                    ))}
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mb-14 h-12 focus:outline-none flex items-center justify-center">
                        <FaCheck className="text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rooms;