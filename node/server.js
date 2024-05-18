const e = require('express');
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
        room.users.forEach(user => {

            if (user.id == userId) {
                findRoom = room;
            }
        });
    });
    return findRoom;
}

function nextColor(player) {
    let colorIndex = player.colorsUnlocked.indexOf(player.color);
    let colorToReturn;
    if(colorIndex == player.colorsUnlocked.length - 1){
        colorToReturn=player.colorsUnlocked[0]
    } else {
        colorToReturn=player.colorsUnlocked[colorIndex + 1]
    }
    return colorToReturn;
}

//connection
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.emit('allRooms', rooms);

    //Create Room
    socket.on('createRoom', (data) => {
        let id = lastRoom++;
        let newRoom = {
            name: data.addRoom.name,
            isPublic: data.addRoom.public,
            mode: data.addRoom.mode,
            admin: [socket.id, data.userAdmin],
            users: [ {id:socket.id, name:data.userAdmin.name, state: null, image: data.userAdmin.image} ],
            id: id,
            accessCode: data.addRoom.accessCode,
            accesible: true,
            status: 'Waiting',
            messages: [],
            game: {
                maps: ["mapatuto", "mapatuto2", "mapatuto3"],
                currentMap: "mapatuto",
                players: [],
                playersData: []
            }
        }
        rooms.push(newRoom);
        socket.join(newRoom.id);
        io.emit('allRooms', rooms);
        console.log('newRoom', newRoom);
        io.to(newRoom.id).emit('newInfoRoom', newRoom);
    });

    //Join Room
    socket.on('joinRoom', (data) => {
        let findRoom = rooms.find(room => room.id == data.id);
        if (findRoom == undefined) {
            return;
        } else {
            let newUser = { id: socket.id, name: data.user.name, state: null, image: data.user.image};
            findRoom.users.push(newUser);
            findRoom.accesible = false;
            findRoom.status = 'inLobby';
            socket.join(findRoom.id);
        }
        io.emit('allRooms', rooms);
        io.to(findRoom.id).emit('newInfoRoom', findRoom);
        console.log('soy gay', findRoom);
    });

    //Change State User
    socket.on('changeState', (data) => {
        let room = findRoomByUser(socket.id);
        let user = room.users.find(user => user.id == socket.id);
        user.state = data.state;
        io.to(room.id).emit('newInfoRoom', room);
    });

    //Exit Room
    socket.on('exitRoom', () => {
        let room = findRoomByUser(socket.id);
        console.log(`Socket ${socket.id} is leaving room ${room.id}`);
        console.log("Room AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", room);
        console.log("users length ", room.users.length);
        if (socket.id == room.admin[0]) {   
            console.log(`soy admin ${socket.id}`);  
            console.log(`room admin ${room.admin[0]}`); 
            console.log(`room users ${room.users}`);      
            if (room.users.length > 1) {
                room.admin[0] = room.users[1].id;
                room.admin[1] = room.users[1].name;
                room.users.splice(0, 1);
                room.accesible = true;
                console.log("Room BBBBBBBBBBBBBBBBBBBBBBB", room);
                socket.leave(room.id);
                socket.emit('newInfoRoom', null);
                io.to(room.id).emit('newInfoRoom', room);
            } else {
                rooms.splice(rooms.indexOf(room), 1);
            }
        } else {
            room.users.splice(1, 1);
            room.accesible = true;
            console.log("Room CCCCCCCCCCCCCCCCCCCCCCCCCCCCC", room);
            socket.leave(room.id);
            socket.emit('newInfoRoom', null);
            io.to(room.id).emit('newInfoRoom', room);
        }
        io.emit('allRooms', rooms);
    });

    socket.on('startGame', ()=>{
        let room = findRoomByUser(socket.id);
        // console.log("choto", room);
        room.status = 'Playing';
        io.emit('allRooms', rooms);
        room.game.players = room.users;
        room.game.playersData =
            [
                {
                    id: room.users[0].id,
                    name: room.users[0].name,
                    x: 0,
                    y: 0,
                    direction: 'right',
                    colorsAvailable: ['white', 'red', 'green'],
                    colorsUnlocked: ['white', 'red', 'green'],
                    color: 'white'
                },
                {
                    id: room.users[1].id,
                    name: room.users[1].name,
                    x: 0,
                    y: 0,
                    direction: 'right',
                    colorsAvailable: ['black', 'blue', 'orange'],
                    colorsUnlocked: ['black', 'blue', 'orange'],
                    color: 'black'
                }
            ];

        io.to(room.id).emit('gameStarted', room);
    })

    socket.on('updatePosition', (data) => {
        let room = findRoomByUser(socket.id);
        if(room){
            let player = room.game.playersData.find(player => player.id == socket.id);
            player.x = data.x;
            player.y = data.y;
            player.direction = data.direction;
            // console.log('updatePosition', player);
            io.to(room.id).emit('updatePositionFront', room.game.playersData);
        }
    });

    socket.on('changeColor', () => {
        let room = findRoomByUser(socket.id);
        let player = room.game.playersData.find(player => player.id == socket.id);
        let newColor = nextColor(player);
        if(newColor){
            player.color = newColor;
        }
        io.to(room.id).emit('changeColorFront', player);
    });

    //Disconnect
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})