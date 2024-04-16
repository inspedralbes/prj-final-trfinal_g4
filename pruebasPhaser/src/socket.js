import io from 'socket.io-client';
console.log(io);


export const socket = io("http://localhost:3001");
