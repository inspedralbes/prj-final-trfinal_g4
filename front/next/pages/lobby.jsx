import React, { use, useEffect, useState } from 'react';
import Header from '../components/header';
import useStore from '../src/store';
import socket from '../services/sockets';
import { useRouter } from 'next/router';

const Lobby = () => {
    const router = useRouter();
    var user = useStore.getState().user.name;
    const [room, setRoom] = useState(useStore.getState().room);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const handleRoomChange = () => {
            router.reload();
        };

        const unsubscribe = useStore.subscribe(
            (state) => {
                setRoom(state.room);
            },
            handleRoomChange
        );

        return () => {
            unsubscribe();
        };
    }, [router.pathname]);

    let chatMessages = '';
    if ( room && room.messages ) {
        room.messages.map((message) => {
            console.log(message);
            if (message.user == user) {
                chatMessages += <div className='chat-message'>
                                    <div className='flex items-end justify-end'>
                                        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
                                            <div>
                                                <span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white'>
                                                    {message.message}
                                                </span>
                                            </div>
                                        </div>
                                        <img src="/images/random.jpg" alt="Venti" className='w-6 h-6 rounded-full order-2' />
                                    </div>
                                </div>
            } else if (message.user == 'Server') {
                chatMessages += <div className='chat-message'>
                                    <div className='flex items-center justify-center'>
                                        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 items-center'>
                                            <div>
                                                <span className='px-4 py-2 rounded-lg inline-block bg-red-600 text-white'>
                                                    {message.message}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            } else {
                chatMessages += <div className='chat-message'>
                                    <div className='flex items-end'>
                                        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                            <div>
                                                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                                    {message.message}
                                                </span>
                                            </div>
                                        </div>
                                        <img src="/images/random.jpg" alt="Venti" className='w-6 h-6 rounded-full order-1' />
                                    </div>
                                </div>
            }
        });
    }

    const adminUser = room && room.admin ? room.admin[1] : '';
    let otherUser = '';

    if (room && room.users && room.users.length > 1) {
        otherUser = room.users[1].name.replace(/['"]+/g, '');
    }

    let contentOtherUser = null;

    if (otherUser != '') {
        contentOtherUser = <div id='userRandom' className='flex items-center mt-2 mb-2'>
                                <div className='flex items-center'>
                                <img src={userFromLocalStorage && userFromLocalStorage.image ? 'http://localhost:8000'+userFromLocalStorage.image : '/images/profiles/default.png'} alt="User" className='w-10 h-10 ml-2 rounded-full' />
                                    <p className='text-2xl ml-3 mt-1 mr-4'>{otherUser}</p>
                                </div>
                                { user != adminUser && room.users[1].state != 'Ready' && (
                                    <div id='buttons-check' className='flex items-center ml-auto'>
                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold inline-flex items-center justify-center px-4 py-2 mx-2 rounded-lg' onClick={() => userReady()}>
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
                                )} 
                                { room && room.users[1].state == 'Ready' && (
                                    <div className='flex items-center ml-auto text-green-500 bg-gray-600 p-2 rounded-lg'>
                                        <p>Llest per jugar!!</p>
                                    </div>
                                )}
                            </div>
    }

    const emitStart = () => {
        socket.emit('startGame', room);
        router.push('/game');
    }

    const userReady = () => {
        socket.emit('changeState', { state: 'Ready' });
    };

    const sendMessage = () => {
        if (message != '') {
            let messageSocket = {
                user: user,
                message: message,
            };
            console.log(messageSocket);
            socket.emit('chatMessage', messageSocket);
            setMessage('');
        }
    };

    const salirSala = () => {
        socket.emit('exitRoom');
        useStore.setState({ room: null });
        router.push('/rooms');
    };

    useEffect(() => {
        if (useStore.getState().room != null && useStore.getState().room.status == 'Playing') {
            router.push('/game');
        }
    });

    return (
        <div className='bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen'>
            <Header />
            <div className='flex flex-col justify-center items-center p-4 text-white mt-9'>
                <h1 className='text-4xl font-bold tracking-wider my-5 animate-pulse text-center mt-9 pt-9'>ESPERANT ACOMPANYANT</h1>
                <div className='min-h-[600px] max-w-[500px] lg:min-w-[850px] text-center lg:flex lg:flex-inline'>
                    {/* Chat section */}
                    <div className='h-[600px] max-w-[500px] mx-auto lg:min-w-[400px] bg-gray-700 rounded-lg flex flex-col m-5 mt-9'>
                        <div id='messages' className='flex-grow flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-rhumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                            { chatMessages }
                        </div>
                        <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16 mx-2'>
                            <div className='relative flex'>
                                <input 
                                placeholder='Escriu un missatge...' 
                                type="text" 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
                                <span className='absolute inset-y-0 flex items-center'>
                                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300' onClick={sendMessage}>
                                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 45 45' stroke='currentColor' className='h-6 w-6 text-gray-600 fill-gray-800 hover:animate-pulse'>
                                            <g id="Layer_2"><path d="m44.4 23.1-40-16c-.4-.2-.9-.1-1.1.2-.3.3-.4.8-.2 1.1l7.8 15.6-7.8 15.6c-.2.4-.1.8.2 1.1.2.2.4.3.7.3.1 0 .3 0 .4-.1l40-16c.4-.2.6-.5.6-.9s-.2-.8-.6-.9zm-38.3-13.2 32.7 13.1h-26.2zm6.5 15.1h26.2l-32.7 13.1z" /></g>
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* users & info room section */}
                    <div className='h-[600px] max-w-[500px] mx-auto lg:min-w-[400px] flex flex-col m-5 mt-9 bg-gray-700 rounded-lg'>
                        {/* Users section */}
                        <div className='h-[200px] mt-4 p-3'>
                            <h1 className='text-3xl font-bold mb-3'>Usuaris a la sala</h1>
                            <div id='adminUser' className='flex items-center mt-2 mb-2'>
                                <div className='flex items-center'>
                                <img src={userFromLocalStorage && userFromLocalStorage.image ? 'http://localhost:8000'+userFromLocalStorage.image : '/images/profiles/default.png'} alt="User" className='w-10 h-10 ml-2 rounded-full' />
                                    <p className='text-2xl ml-3 mt-1 mr-4'>{adminUser}</p>
                                </div>
                                { user == adminUser && room.users[0].state != 'Ready' && (
                                    <div id='buttons-check' className='flex items-center ml-auto'>
                                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold inline-flex items-center justify-center px-4 py-2 mx-2 rounded-lg' onClick={() => userReady()}>
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
                                )}
                                { room && room.users[0].state == 'Ready' && (
                                    <div className='flex items-center ml-auto text-green-500 bg-gray-600 p-2 rounded-lg'>
                                        <p>Llest per jugar!!</p>
                                    </div>
                                )}
                            </div>
                            {contentOtherUser}
                        </div>
                        {/* info room section */}
                        <div className='h-[400px] flex flex-col items-center p-3'>
                            <h1 className='text-3xl font-bold mb-3 mt-5'>Informació de partida</h1>
                            <div className='bg-white rounded-lg w-[350px] text-black'>
                                { room && room.isPublic == false && (
                                    <div>
                                        <p className='text-2xl font-bold mt-2'>Codi de la sala:</p>
                                        <p className='text-2xl text-red-500'>{room.accessCode}</p>
                                    </div>
                                )}
                                <p className='text-2xl font-bold'>Nom de la sala:</p>
                                <p className='text-2xl'>{room && room.name}</p>
                                <p className='text-2xl font-bold'>Mode joc:</p>
                                <p className='text-2xl'>{room && room.mode}</p>
                                <p className='text-2xl font-bold'>Mapes seleccionats:</p>
                                { room && room.game.maps && (
                                    <ul className='text-2xl font-bold flex items-center justify-center text-center mb-4 mt-2'>
                                        <li>
                                            <img src={`${room.game.maps[0].imageUrl}`} alt="mapa" className="w-24 h-12" />
                                        </li>
                                        <li>
                                            <img src={`${room.game.maps[1].imageUrl}`} alt="mapa" className="w-24 h-12 mx-2" />
                                        </li>
                                        <li>
                                            <img src={`${room.game.maps[2].imageUrl}`} alt="mapa" className="w-24 h-12" />
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {  user == adminUser && room && room.users.length > 1 && room.users[0].state == 'Ready' &&  room.users[1].state == 'Ready' && (
                    <button className="text-white text-2xl font-bold py-2 px-4 w-40 rounded mt-5 bg-red-500 hover:bg-red-700" onClick={emitStart}>
                        Iniciar Joc
                    </button>
                )}
            </div>
        </div>
    );
};

export default Lobby;