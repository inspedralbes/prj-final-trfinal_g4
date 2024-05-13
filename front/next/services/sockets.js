import io from 'socket.io-client';
import useStore from '../src/store';
// import { useRouter } from 'next/router';

const url = 'http://localhost:3727';
// const url = 'http://'; // Add production url here

const socket = io(url);
//const router = useRouter();
//Recibir todas las rooms que hay en socket y actualizar el estate
socket.on('allRooms', (rooms) => {
    useStore.setState({ rooms });
});

socket.on('InfoRoom', (room) => {
    useStore.setState({ room });
});

socket.on('gameStarted', (data)=>{
    useStore.setState({ localUserSocketId: socket.id });
    console.log(data);
    let playerData=data.game.playersData.find(player=>player.id==socket.id);

    useStore.setState({playerData: playerData})
    useStore.setState({gameData: data.game})
    useStore.setState({room: data})
    //router.push('/game');
});

socket.on('updatePositionFront', (data) => {
    useStore.setState({ playerData: data });
});

socket.on('changeColorFront', (data) =>{
    useStore.setState({playerData: data})
});
export default socket;