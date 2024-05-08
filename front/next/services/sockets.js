import io from 'socket.io-client';
import useStore from '../src/store';
import { useRouter } from 'next/router';
const router = useRouter();
const url = 'http://localhost:3727';
// const url = 'http://'; // Add production url here

const socket = io(url);

//Recibir todas las rooms que hay en socket y actualizar el estate
socket.on('allRooms', (rooms) => {
    useStore.setState({ rooms });
});

socket.on('gameStarted', (data)=>{
    useStore.setState({ localUserSocketId: socket.id });
    let playerData=data.playersData.find(player=>player.id==socket.id);
    useStore.setState({playerData: playerData})
    useStore.setState({gameData: data})
    router.push('/game');
});

export default socket;