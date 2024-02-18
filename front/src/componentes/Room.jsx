// import './App.css';
// import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import  { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

export const Room = () => {

    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    // const [messageSend, setMessageSend] = useState("");


    const joinRoom = () => {
      if(room !== "") {
        socket.emit("joinRoom", room)
      }
    }
    // const sendMessage = () => {
    //   socket.emit("sendMessage", { message, room })
    //   setMessageSend(message)
    // }

    useEffect(() => {
      socket.on("receiveMessage", (data) => {
        setMessageReceived(data.message)
      })
  
    }, [socket])
    
    
    return (
      <div className="room-container">
        <div>
        <button>CREATE ROOM</button>
        </div>
        <div>
          <table>
            <tr>
              <td>Room</td>
            </tr>
            <tr>
              <td>Room 1</td>
            </tr>
            <tr>
              <td>Room 2</td>
            </tr>
            <tr>
              <td>Room 3</td>
            </tr>
          </table>

        </div>
        <div>
          <button>JOIN PUBLIC</button>
        </div>
        
        <div>
        <button>JOIN PRIVATE</button>
        </div>
        {/* <h1>Chat</h1> */}
        {/* {messageReceived}
        {messageSend} */}
        </div>
    );
   
  
}

