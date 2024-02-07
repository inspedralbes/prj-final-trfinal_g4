import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5176');

export const Hi = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages([...messages, msg]);
        });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('chat message', message);
        setMessage("");
    };

    return (
        <div>
            <ul id="messages">
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <button>Send</button>
            </form>
        </div>
    );
}