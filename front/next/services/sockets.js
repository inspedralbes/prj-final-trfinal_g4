import io from 'socket.io-client';
import useStore from '../src/store';

const url = 'http://localhost:3727';
// const url = 'http://'; // Add production url here

const socket = io(url);

let store;

setTimeout(() => {
    store = useStore;
}, 500);

//Recibir todas las rooms que hay en socket y actualizar el estate
socket.on('allRooms', (rooms) => {
    console.log(rooms);
    store.setRooms(rooms);
    store.rooms.map((room) => {
        console.log(room);
    });
});