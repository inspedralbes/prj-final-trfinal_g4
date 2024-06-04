import io from 'socket.io-client';
import useStore from '../src/store';

const URL = 'http://chromaticbond.cat'; // Change this to the URL of the server

const socket = io(URL);

//Recibir todas las rooms que hay en socket y actualizar el estate
socket.on('allRooms', (rooms) => {
    useStore.setState({ rooms });
});

//Recibir la nueva room que se ha creado y actualizar el estate
socket.on('newInfoRoom', (room) => {
    useStore.setState({ room });
});

//Recibir los mensajes de chat y actualizar el estate
socket.on('newMessage', (message) => {
    const currentMessages = useStore.getState().messages;
    useStore.setState({ messages: [...currentMessages, message] });
});

socket.on('gameStarted', (data)=>{
    useStore.setState({ localUserSocketId: socket.id });
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

socket.on('winFront', (data) =>{
    useStore.setState({gameData: data})
});

socket.on("finishGame", () => {
    useStore.getState().room = null;
      
      useStore.setState({ game: null });
      
  });
  socket.on("endGamefront", () => {
    useStore.getState().room = null;
      
  });

export default socket;
