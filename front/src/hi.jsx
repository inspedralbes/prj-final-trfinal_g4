import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const Hi = (props) => {
    const socket = io();

    const [inputValue, setInputValue] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        const form = document.getElementById('form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (inputValue) {
                socket.emit('chat message', inputValue);
                setInputValue('');
            }
        });

        socket.on('chat message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            messagesRef.current.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
            console.log(msg);
        });

        return () => {
            form.removeEventListener('submit', (e) => {
                e.preventDefault();
            });
        };
    }, [inputValue, socket]);

    return (
        <div>
            <h1>Hi</h1>
            <ul ref={messagesRef} id="messages"></ul>
            <form id="form" action="">
                <input
                    id="input"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button>Send</button>
            </form>
        </div>
    );
};
