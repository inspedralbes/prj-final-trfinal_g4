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
                <div className='flex flex-col min-w-[425px] mx-3 grid grid-cols-2 justify-center items-center'>
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