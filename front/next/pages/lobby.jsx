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
            <div className='min-h-[600px] min-w-[850px] bg-black text-center'>
                <h1 className='text-4xl font-bold tracking-wider my-5 animate-pulse'>ESPERANT ACOMPANYANT</h1>
                {/* Chat section */}
                {/* <div className='flex flex-col min-w-[425px] mx-3 grid grid-cols-2 justify-center items-center'>
                    <div className='max-h-[350px] overflow-y-auto' >
                        <div className=" max-h-[350px] max-w-[250px]">
                            <div className="flex flex-col ">
                                <div className="flex flex-col">
                                    {chatMessages.map((chatMessage, index) => (
                                        <div key={index} className={`bg-${chatMessage.sender == 'me' ? 'blue' : 'green'}-500 text-white py-2 px-4 rounded-lg mb-1 ${chatMessage.sender == 'me' ? 'self-end' : ''}`}
                                        >
                                            {chatMessage.text}
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-slate-600 rounded-lg w-full max-w-xl ">
                            <div className="flex flex-col items-center bg-zinc-200 mx-8 ">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-5 text-black max-w-[350px] min-w-[200px]">
                    <div class="flex flex-row justify-center items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Escribe tu mensaje..."
                            className="border border-gray-400 px-4 py-2 rounded-l-md"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-green-500 text-white px-4 py-2 rounded-r-md"
                        >
                            Enviar
                        </button>
                    </div>
                </div> */}
                <div className='max-h-[350px] max-w-[400px]'>
                    <div id='messages' className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-rhumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                        {/* Primer Mensaje */}
                        <div className='chat-message'>
                            <div className='flex items-end'>
                                <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                    <div>
                                        <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                            Hola! ¿Cómo estás?
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
                                            ¡Hola! Bien y tú?
                                        </span>
                                    </div>
                                </div>
                                <img src="/images/random.jpg" alt="Venti" className='w-6 h-6 rounded-full order-2' />
                            </div>
                        </div>
                    </div>

                    <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16'>
                        <div className='relative flex'>
                            <span className='absolute inset-y-0 flex items-center'>
                                <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='h-6 w-6 text-gray-600'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'></path>
                                    </svg>
                                </button>
                            </span>
                            <input placeholder='Escriu un missatge...' type="text" className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
                        </div>
                    </div>
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