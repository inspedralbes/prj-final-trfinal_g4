const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3727;
const server = createServer(app);

var rooms = [];
var lastRoom = 0;

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
    socket.emit('allRooms', rooms);

    //Create Room
    socket.on('createRoom', (addRoom, userAdmin) => {
        let id = lastRoom++;
        console.log('Room created');
        let newRoom = {
            name: addRoom.name,
            isPublic: addRoom.public,
            mode: addRoom.mode,
            admin: [socket.id, userAdmin],
            users: [socket.id, userAdmin],
            id: id,
            accessCode: addRoom.accessCode,
            accesible: true,
            status: 'Waiting'
        }
        rooms.push(newRoom);
        console.log(rooms);
        io.emit('allRooms', rooms);
    });

    //Join Room
    socket.on('joinRoom', (id, userName) => {
        console.log(id);
        let findRoom = rooms.find(room => room.id == id);
        console.log(findRoom);
        if (findRoom == undefined) {
            console.log('Room not found');
            return;
        } else {
            console.log('Room found');
            // console.log('Room joined');
            let newUser = [socket.id, userName];
            findRoom.users.push(newUser);
            findRoom.accesible = false;
            findRoom.status = 'inLobby';
            console.log(findRoom);
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