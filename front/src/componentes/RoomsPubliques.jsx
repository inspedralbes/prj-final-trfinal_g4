import React, { useState, useEffect} from "react";
import io from 'socket.io-client';

 export const RoomsPubliques = () => {
    const [roomName, setRoomsName] = useState("");
    const [rooms, setRooms] = useState([]);
    const username = localStorage.getItem('username');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const socket = io.connect("http://localhost:3001", {
        query: {
          username: username
        }
      });
    useEffect(() => {
        socket.on('updateRooms', (data) => {
            setRoomsName(data);
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

    const handleJoinRoom = () => {
        socket.emit("join", roomName);
        console.log(roomName);
    };

    socket.on('getUser', (data) => {
        console.log(data);
    });

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