import io from 'socket.io-client';
import useStore from '../src/store';

const url = 'http://localhost:3727';

const socket = io(url);

//Recibir todas las rooms que hay en socket y actualizar el estate
socket.on('allRooms', (rooms) => {
    useStore.setState({ rooms });
    console.log(`Rooms: ${rooms}`);
});

//Recibir la nueva room que se ha creado y actualizar el estate
socket.on('newInfoRoom', (room) => {
    useStore.setState({ room });
});

//Recibir los mensajes de chat y actualizar el estate
socket.on('newMessage', (message) => {
    const currentMessages = useStore.getState().messages;
    useStore.setState({ messages: [...currentMessages, message] });
    console.log(`Chat Message: ${message}`);
});

socket.on('gameStarted', (data)=>{
    useStore.setState({ localUserSocketId: socket.id });
    // console.log(data);
    let playerData = data.game.playersData.find( player => player.id == socket.id );
    useStore.setState({playerData: playerData})
    useStore.setState({gameData: data.game})
    useStore.setState({room: data})
});

socket.on('updatePositionFront', (data) => {
    useStore.setState({ playerData: data });
});

socket.on('changeColorFront', (data) =>{
    useStore.setState({playerData: data})
});
export default socket;