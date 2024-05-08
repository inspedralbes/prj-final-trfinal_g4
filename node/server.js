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

function findRoomByUser(userId) {
    let findRoom;
    rooms.forEach(room => {
        console.log("ThisUsers",room.users[0]);
        console.log("ThisUsers2",userId);
        room.users.forEach(user => {
            console.log("ThisUsers1",user);
            if (user.id == userId) {
                findRoom = room;
            }
        });
    });
    return findRoom;
}

//connection
io.on('connection', (socket) => {
    console.log (`Connected: ${socket.id}`);
    socket.emit('allRooms', rooms);

    //Create Room
    socket.on('createRoom', (data) => {
        let id = lastRoom++;
        console.log('Room created');
        let newRoom = {
            name: data.addRoom.name,
            isPublic: data.addRoom.public,
            mode: data.addRoom.mode,
            admin: [socket.id, data.userAdmin],
            users: [{id:socket.id, name:data.userAdmin}],
            id: id,
            accessCode: data.addRoom.accessCode,
            accesible: true,
            status: 'Waiting',
            game:{
                maps: ["mapatuto", "mapatuto2", "mapatuto3"],
                currentMap: "mapatuto",
                players: [],
                playersData: []
            }
        }
        socket.join(newRoom.id);
        rooms.push(newRoom);
        console.log(rooms);
        io.emit('allRooms', rooms);
    });

    //Join Room
    socket.on('joinRoom', (data) => {
        console.log("PENE",data);
        let findRoom = rooms.find(room => room.id == data.id);
        console.log(findRoom);
        if (findRoom == undefined) {
            console.log('Room not found');
            return;
        } else {
            console.log('Room found');
            console.log('PENEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', findRoom.users);
            let newUser = {"id":socket.id, "name":data.username};
            findRoom.users.push(newUser);
            findRoom.accesible = false;
            findRoom.status = 'inLobby';
            console.log(findRoom);
            socket.join(findRoom.id);
        }
        io.emit('allRooms', rooms);
    });

    socket.on('startGame', ()=>{
        let room = findRoomByUser(socket.id);
        console.log("choto",room);
        room.status = 'Playing';
        io.emit('allRooms', rooms);
        room.game.players = room.users;
        room.game.playersData ={
            player1: {
                id: room.users[0].id,
                name: room.users[0].name,
                x: 0,
                y: 0,
                direction: 'right',
                colorsAvailable: ['white','red'],
                colorsUnlocked: ['white'],
                color: 'white'
            },
            player2: {
                id: room.users[1].id,
                name: room.users[1].name,
                x: 0,
                y: 0,
                direction: 'right',
                colorsAvailable: ['black','blue'],
                colorsUnlocked: ['black'],
                color: 'black'
            }
        }
        io.to(room.id).emit('gameStarted', room.game);
    })
    //Disconnect
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})