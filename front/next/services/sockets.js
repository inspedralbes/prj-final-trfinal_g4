import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const url = 'http://localhost:3727';
// const url = 'http://'; // Add production url here

const socket = io(url);

let state;
let effect;

setTimeout(() => {
    state = useState;
    effect = useEffect;
}, 500);