import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5176');

export const Landing = () => {


    return (
        <div>
            <a href="/login">
                <button>Login</button>
            </a>
            <a href="/register">
                <button>Register</button>
            </a>
        </div>
    );
}