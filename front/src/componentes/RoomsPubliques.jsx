import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

export const RoomsPubliques = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [roomName, setRoomsName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const socket = io.connect("http://localhost:3001");

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

    const handleJoinRoom = async () => {
        try {
            const urlStrapi = 'http://localhost:1337/api/auth/local';
            
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: email,
                    password: pass,
                }),
            });

            if (response.ok) {
                const userData = await response.json();
                const username = userData.username;

                // Une al usuario a la sala con su nombre de usuario
                socket.emit("join", { room: roomName, username });
                console.log("Joining room:", roomName, "as user:", username);
            } else {
                console.error('Error fetching user:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error joining room:', error);
        }
    };

    return (
        <div>
            <h1>Rooms</h1>
            <form className="form-room" >
                <label htmlFor="text">Name Room</label>
                <input value={roomName} onChange={(e) => setRoomsName(e.target.value)} type="text" />

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