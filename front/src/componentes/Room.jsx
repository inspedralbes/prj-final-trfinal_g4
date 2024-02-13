// import './App.css';
import  { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

export const Room = () => {

    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [messageSend, setMessageSend] = useState("")
    
    const joinRoom = () => {
      if(room !== "") {
        socket.emit("joinRoom", room)
      }
    }
    const sendMessage = () => {
      socket.emit("sendMessage", { message, room })
      setMessageSend(message)
    }

    useEffect(() => {
      socket.on("receiveMessage", (data) => {
        setMessageReceived(data.message)
      })
  
    }, [socket])
    
    
    return (
      <div className="room-container">
        <input placeholder="Room Number..." onChange={(event) => {
          setRoom(event.target.value);
        }} />
        <button onClick={joinRoom}>Join</button>
        <input placeholder="Message..." onChange={(event) => {
          setMessage(event.target.value)
        }} />
        <button onClick={sendMessage}>Send Message</button>
        
        <h1>Chat</h1>
        {messageReceived}
        {messageSend}
        
      </div>
    );
   
  
}

