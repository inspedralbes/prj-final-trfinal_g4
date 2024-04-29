import io from 'socket.io-client';
import useStore from '../src/store';

const url = 'http://localhost:3727';
// const url = 'http://'; // Add production url here

const socket = io(url);

//Recibir todas las rooms que hay en socket y actualizar el estate
socket.on('allRooms', (rooms) => {
    // console.log(rooms);
    useStore.setState({ rooms });
    // console.log(useStore.getState().rooms);
});

export default socket;