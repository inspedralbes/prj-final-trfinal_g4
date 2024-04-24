import React, { useState, useEffect, useRef } from 'react';
import Loading from '../components/loading';

const Lobby = () => {
    const [loading, setLoading] = useState(true);
    const [buttonState, setButtonState] = useState(true);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleButtonClick = () => {
        setButtonState((prevState) => (prevState + 1) % 3);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() != '') {
            setChatMessages([...chatMessages, { text: message, sender: 'me' }]);
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    let buttonColorClass = '';
    let buttonText = '';

    switch (buttonState) {
        case 0:
            buttonColorClass = 'bg-blue-500 hover:bg-blue-700';
            buttonText = 'Listo';
            break;
        case 1:
            buttonColorClass = 'bg-green-500 hover:bg-green-700';
            buttonText = 'Esperando...';
            break;
        case 2:
            buttonColorClass = 'bg-red-500 hover:bg-red-700';
            buttonText = 'Iniciar';
            break;
        default:
            buttonColorClass = 'bg-blue-500 hover:bg-blue-700';
            buttonText = 'Listo';
    }

    return (
        <div className='bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center p-4  text-white'>
            <h1 className='text-4xl font-bold tracking-wider my-5 animate-pulse'>ESPERANT ACOMPANYANT</h1>
            <div className='min-h-[600px] min-w-[850px] text-center flex flex-inline'>
                {/* Chat section */}
                <div className='h-[600px] min-w-[400px] bg-black flex flex-col m-5 mt-9'>
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
                    <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16'>
                        <div className='relative flex'>
                            <input placeholder='Escriu un missatge...' type="text" className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
                            <span className='absolute inset-y-0 flex items-center'>
                                <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 45 45' stroke='currentColor' className='h-6 w-6 text-gray-600'>
                                        <g id="Layer_2"><path d="m44.4 23.1-40-16c-.4-.2-.9-.1-1.1.2-.3.3-.4.8-.2 1.1l7.8 15.6-7.8 15.6c-.2.4-.1.8.2 1.1.2.2.4.3.7.3.1 0 .3 0 .4-.1l40-16c.4-.2.6-.5.6-.9s-.2-.8-.6-.9zm-38.3-13.2 32.7 13.1h-26.2zm6.5 15.1h26.2l-32.7 13.1z"/></g>
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                {/* users & info room section */}
                <div className='h-[600px] min-w-[400px] flex flex-col m-5 mt-9'>
                    {/* Users section */}
                    <div className='h-[200px]'></div>
                    {/* info room section */}
                    <div className='h-[400px]'></div>
                </div>
            </div>
            <button className={`text-white text-2xl font-bold py-2 px-4 w-40 rounded mt-5 ${buttonColorClass}`} onClick={handleButtonClick}>
                {buttonText}
            </button>
            {/* {loading ? <Loading /> : <h1>Data Loaded!</h1>} */}
        </div>
    );
};

export default Lobby;