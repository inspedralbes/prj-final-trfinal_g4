const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3727;
const server = createServer(app);

var rooms = [];
// var lastRoom = 0;

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
});

//connection
io.on('connection', (socket) => {
    console.log (`Connected: ${socket.id}`);
    io.emit('allRooms', rooms);    

    //Create Room
    socket.on('createRoom', (addRoom) => {
        console.log('Room created');
        let newRoom = {
            name: addRoom.name,
            isPublic: addRoom.public,
            mode: addRoom.mode,
            admin: socket.id,
            users: [socket.id]
        }
        rooms.push(newRoom);
        console.log(rooms);
        io.emit('allRooms', rooms);
    });

    //Join Room
    socket.on('joinRoom', (room) => {
        console.log(room);
        let findRoom = rooms.find(r => r == room);
        if ( findRoom == undefined ) {
            console.log('Room not found');
            return;
        } else {
            console.log('Room found');
            console.log('Room joined');
            findRoom.users.push(socket.id);
            socket.join(findRoom);
        }
        io.emit('allRooms', rooms);
    });

    //Disconnect
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})