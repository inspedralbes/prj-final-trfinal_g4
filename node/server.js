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
        console.log('Room created');
        let newRoom = {
            name: data.addRoom.name,
            isPublic: data.addRoom.public,
            mode: data.addRoom.mode,
            admin: [socket.id, data.userAdmin],
            users: [{ id: socket.id, name: data.userAdmin }],
            id: id,
            accessCode: data.addRoom.accessCode,
            accesible: true,
            status: 'Waiting',
            game: {
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
        io.to(newRoom.id).emit('InfoRoom', newRoom);
    });

    //Join Room
    socket.on('joinRoom', (data) => {
        let findRoom = rooms.find(room => room.id == data.id);
        console.log(findRoom);
        if (findRoom == undefined) {
            console.log('Room not found');
            return;
        } else {
            console.log('Room found');
            let newUser = { "id": socket.id, "name": data.username };
            findRoom.users.push(newUser);
            findRoom.accesible = false;
            findRoom.status = 'inLobby';
            console.log(findRoom);
            socket.join(findRoom.id);
        }
        io.emit('allRooms', rooms);
        io.to(findRoom.id).emit('InfoRoom', findRoom);
    });
    socket.on('startGame', () => {
        let room = findRoomByUser(socket.id);
        console.log("choto", room);
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
    //Disconnect
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });

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

    socket.on('death', () => {
        
        io.to(findRoomByUser(socket.id).id).emit('deathFront')
    } );

    socket.on('win', () => {
       console.log("OLEEEEEEEEEEEE");
    } );
});


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})