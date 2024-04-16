import React, { useState, useEffect} from "react";
import io from 'socket.io-client';

 export const RoomsPubliques = () => {
    const [roomName, setRoomsName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const socket = io.connect("http://localhost:3001");

    const handleJoinRoom = () => {
        const username = localStorage.getItem('username');
        socket.emit("createRoom", {roomName, username});

        socket.emit('userConnected', {username});

    };
    useEffect(() => {

        socket.on('userConnected', (data) => {
            localStorage.setItem('username', data.username);
        });

        socket.on('updateRooms', (data) => {
            setRooms(data); // Corregido: Utiliza setRooms para actualizar el estado rooms
            console.log(data);
        });

        return () => {
            socket.disconnect();
        };

        
    }, [socket]);

    // const handleRoomSelect = (room) => {
    //     setSelectedRoom(room);
    //     console.log(room);
    //     socket.emit('join', room);
    // };

    return (
        <div>
            <h1>Rooms</h1>
            <form className="form-room" >
                <label htmlFor="text">Name Room</label>
                <input value={roomName} onChange={(e) => setRoomsName(e.target.value)} type="text"/>
                
            </form>
            <button type="submit" onClick={handleJoinRoom}>Create Public Room</button>
            
            {/* <ul>
                {rooms.map((room) =>(
                    <li key={room}>
                        {room}
                        <button onClick={() => handleRoomSelect(room)}>Join</button>
                    </li>
                ))}
            </ul> */}
            {/* <div>
                {selectedRoom && <p>Selected room: {selectedRoom}</p>}
            </div> */}
        </div>
    );
};