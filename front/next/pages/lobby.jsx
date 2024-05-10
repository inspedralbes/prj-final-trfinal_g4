import React, { useState, useEffect, useRef, use } from 'react';
import Loading from '../components/loading';
import Header from '../components/header';
import useStore from '../src/store';
import Link from 'next/link';
import socket from '../services/sockets';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

const Lobby = () => {
    const [rooms, setRooms] = useState(useStore.getState().rooms);
    const [room, setRoom] = useState(useStore.getState().room);
    const router = useRouter();

    const emitStart= ()=> {
        console.log('Emitiendo startGame');
        socket.emit('startGame', room);
        router.push('/game');
    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa', room.id);
    console.log('VIVA HITLER', room);
    console.log('quiero una cbr 650r y a la mama de fabian', rooms);
    const salirSala = () => {
        console.log('Saliendo de la sala');
        socket.emit('exitRoom', { id: room.id });
        router.push('/rooms');
        // Además de redireccionar, aquí deberías actualizar la lista de salas
        const updatedRooms = rooms.filter(r => r.id !== room.id);
        setRooms(updatedRooms);
    }
    

    useEffect(() => {
        socket.on('allRooms', (updatedRooms) => {
            setRooms(updatedRooms);
        });
        return () => {
            socket.off('allRooms');
        };
    }, []);
    

    return (
        <div>
            <Header />
            <div className='bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center p-4  text-white'>
                <h1 className='text-4xl font-bold tracking-wider my-5 animate-pulse'>ESPERANT ACOMPANYANT</h1>
                <div className='min-h-[600px] min-w-[850px] text-center flex flex-inline'>
                    {/* Chat section */}
                    <div className='h-[600px] min-w-[400px] bg-gray-700 rounded-lg flex flex-col m-5 mt-9'>
                        <div id='messages' className='flex-grow flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-rhumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                            {/* Primer Mensaje */}
                            <div className='chat-message'>
                                <div className='flex items-end'>
                                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                                Hola! ¿Cómo estás? (otro)
                                            </span>
                                        </div>
                                    </div>
                                    <img src="/images/random.jpg" alt="Venti" className='w-6 h-6 rounded-full order-1' />
                                </div>
                            </div>
                            {/* Segundo Mensaje */}
                            <div className='chat-message'>
                                <div className='flex items-end justify-end'>
                                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white'>
                                                ¡Hola! Bien y tú? (tu)
                                            </span>
                                        </div>
                                    </div>
                                    <img src="/images/random.jpg" alt="Venti" className='w-6 h-6 rounded-full order-2' />
                                </div>
                            </div>
                            <div className='chat-message'>
                                <div className='flex items-center justify-center'>
                                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 items-center'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block bg-red-600 text-white'>
                                                Missatges Servidor
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16 mx-2'>
                            <div className='relative flex'>
                                <input placeholder='Escriu un missatge...' type="text" className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
                                <span className='absolute inset-y-0 flex items-center'>
                                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 45 45' stroke='currentColor' className='h-6 w-6 text-gray-600 fill-gray-800 hover:animate-pulse'>
                                            <g id="Layer_2"><path d="m44.4 23.1-40-16c-.4-.2-.9-.1-1.1.2-.3.3-.4.8-.2 1.1l7.8 15.6-7.8 15.6c-.2.4-.1.8.2 1.1.2.2.4.3.7.3.1 0 .3 0 .4-.1l40-16c.4-.2.6-.5.6-.9s-.2-.8-.6-.9zm-38.3-13.2 32.7 13.1h-26.2zm6.5 15.1h26.2l-32.7 13.1z" /></g>
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* users & info room section */}
                    <div className='h-[600px] min-w-[400px] flex flex-col m-5 mt-9 bg-gray-700'>
                        {/* Users section */}
                        <div className='h-[200px] mt-4'>
                            <h1 className='text-3xl font-bold mb-3'>Usuaris a la sala</h1>
                            <div id='adminUser' className='flex items-center mt-2 mb-2'>
                                <div className='flex items-center'>
                                    <img src="/images/random.jpg" alt="Venti" className='w-10 h-10 ml-2 rounded-full' />
                                    <p className='text-2xl ml-3 mt-1 mr-4'>admin37482</p>
                                </div>
                                <div id='buttons-check' className='flex items-center ml-auto'>
                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold inline-flex items-center justify-center px-4 py-1 mx-2 rounded-lg'>
                                        Llest?
                                    </button>
                                </div>
                            </div>
                            <div id='userRandom' className='flex items-center mt-2 mb-2'>
                                <div className='flex items-center'>
                                    <img src="/images/random.jpg" alt="Venti" className='w-10 h-10 ml-2 rounded-full' />
                                    <p className='text-2xl ml-3 mt-1 mr-4'>venti37482</p>
                                </div>
                                <div id='buttons-check' className='flex items-center ml-auto'>
                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold inline-flex items-center justify-center px-4 py-2 mx-2 rounded-lg'>
                                        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                    </button>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold inline-flex items-center justify-center px-4 py-2 mr-2 rounded-lg' onClick={()=>salirSala()}>
                                        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* info room section */}
                        <div className='h-[400px] flex flex-col items-center'>
                            <h1 className='text-3xl font-bold mb-3 mt-5'>Informació de partida</h1>
                            <div className='bg-white rounded-lg w-[350px] text-black'>
                                <p className='text-2xl font-bold mt-2'>Nom de la sala:</p>
                                <p className='text-2xl'>{room.name}</p>
                                <p className='text-2xl font-bold'>Mode joc:</p>
                                <p className='text-2xl'>{room.mode}</p>
                                <p className='text-2xl font-bold'>Mapes seleccionats:</p>
                                <ul className='text-2xl font-bold flex items-center justify-center text-center mb-4 mt-2'>
                                    <li>
                                        <img src="/images/random.jpg" alt="mapa" className="w-24 h-12" />
                                    </li>
                                    <li>
                                        <img src="/images/random.jpg" alt="mapa" className="w-24 h-12 mx-2" />
                                    </li>
                                    <li>
                                        <img src="/images/random.jpg" alt="mapa" className="w-24 h-12" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
       
                    <button className="text-white text-2xl font-bold py-2 px-4 w-40 rounded mt-5 bg-red-500 hover:bg-red-700" onClick={emitStart}>
                        Iniciar Joc
                    </button>

            </div>
        </div>
    );
};

export default Lobby;