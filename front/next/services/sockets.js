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
    console.log(`New INFO ROOM: ${room}`);
    console.log(`Users: ${room.users}`);
});

socket.on('gameStarted', (data)=>{
    useStore.setState({ localUserSocketId: socket.id });
    // console.log(data);
    let playerData = data.game.playersData.find( player => player.id == socket.id );
    useStore.setState({playerData: playerData})
    useStore.setState({gameData: data.game})
    useStore.setState({room: data})
    console.log("ESCORTO",useStore.getState().room)
});

socket.on('updatePositionFront', (data) => {
    useStore.setState({ playerData: data });
});

socket.on('changeColorFront', (data) =>{
    useStore.setState({playerData: data})
});

socket.on('winFront', (data) =>{
    useStore.setState({gameData: data})
});
export default socket;