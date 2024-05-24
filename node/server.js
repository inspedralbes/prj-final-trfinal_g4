const e = require('express');
const express = require('express');
const { cp } = require('fs');
const { createServer, get } = require('http');
const { config } = require('process');
const { Server } = require('socket.io');
// const fetch = require('node-fetch'); // Add this line to import the fetch function

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
    if (colorIndex == player.colorsUnlocked.length - 1) {
        colorToReturn = player.colorsUnlocked[0]
    } else {
        colorToReturn = player.colorsUnlocked[colorIndex + 1]
    }
    return colorToReturn;
}

async function getRandomMaps() {
    let maps = [];
    let tuto = await fetch("http://localhost:8000/api/randomMaps", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    maps= await tuto.json();

    return maps;
}

async function getOriginalMaps() {
    let maps = [];
    let tuto = await fetch("http://localhost:8000/api/defaultMaps", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    maps= await tuto.json();
    return maps;
}

async function getMapData(data) {
    let maps = [];
    let tuto = await fetch("http://localhost:8000/api/maps/7", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    let tutoJson = await tuto.json();
    maps.push(tutoJson);
    switch (data.mode) {
        case 'Aleatori':
            console.log("Aleatoris");
            let randomMaps = await getRandomMaps();
            randomMaps.forEach(map => {
                maps.push(map);
            });
            break;
        case 'Mapes originals':
            let originalMaps = await getOriginalMaps();
            originalMaps.forEach(map => {
                maps.push(map);
            });
            break;
        case 'Mapes de la comunitat':
            let communityMaps = await getCommunityMaps(data.maps);
            console.log("Garcilaso de la Vega", communityMaps);
            communityMaps.forEach(map => {
                console.log("Garcilaso de la Verga", map);
                maps.push(map);
            });
            break;
    }
    return maps;
}

function getCommunityMaps(maps) {
    let mapsArray = [];
    maps.forEach(async map => {

        let mapData = await fetch("http://localhost:8000/api/maps/" + map.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        let mapDataJson = await mapData.json();

        mapsArray.push(mapDataJson);
        
    });
    return mapsArray;
}

//connection
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.emit('allRooms', rooms);

    //Create Room
    socket.on('createRoom', async (data) => {
        let id = lastRoom++;
        // let mapData = null;
        getMapData(data.addRoom).then((mapsFull) => {
            let newRoom = {
                name: data.addRoom.name,
                isPublic: data.addRoom.public,
                mode: data.addRoom.mode,
                admin: [socket.id, data.userAdmin.name, data.userAdmin.image],
                users: [{ id: socket.id, name: data.userAdmin.name, state: null, image: data.userAdmin.image }],
                id: id,
                accessCode: data.addRoom.accessCode,
                accesible: true,
                status: 'Waiting',
                messages: [{ user: 'Server', message: `${data.userAdmin.name} ha creat la sala` }],
                game: {
                    maps: mapsFull,
                    currentMap: 0,
                    players: [],
                    playersData: []
                }
            };
            rooms.push(newRoom);
            socket.join(newRoom.id);
            io.emit('allRooms', rooms);
            console.log('newRoom', newRoom.game.maps);
            console.log('message', newRoom.messages);
            io.to(newRoom.id).emit('newInfoRoom', newRoom);
        });
    });

    //Quick Game
    socket.on('quickGame', async (data) => {
        let roomToJoin=null;
        rooms.forEach(room => {
            if (room.isPublic && room.status!='Playing' && room.users.length<2) {
                roomToJoin = room;
            }
        });
        if(roomToJoin!=null){
            let newUser = { id: socket.id, name: data.user.name, state: null, image: data.user.image };
            roomToJoin.users.push(newUser);
            roomToJoin.accesible = false;
            roomToJoin.status = 'inLobby';
            roomToJoin.messages.push({ user: 'Server', message: `${data.user.name} s'ha unit a la sala` });
            socket.join(roomToJoin.id);
            io.emit('allRooms', rooms);
            io.to(roomToJoin.id).emit('newInfoRoom', roomToJoin);
        } else{
            let id = lastRoom++;
            let config = {
                mode: 'Aleatori',
                maps: []
            }
            getMapData(config).then((mapsFull) => {
                let newRoom = {
                    name: 'Quick Game'+Math.floor(Math.random() * 1000),
                    isPublic: true,
                    mode: 'Aleatori',
                    admin: [socket.id, data.user.name, data.user.image],
                    users: [{ id: socket.id, name: data.user.name, state: null, image: data.user.image }],
                    id: id,
                    accessCode: null,
                    accesible: true,
                    status: 'Waiting',
                    messages: [{ user: 'Server', message: `${data.user.name} ha creat la sala` }],
                    game: {
                        maps: mapsFull,
                        currentMap: 0,
                        players: [],
                        playersData: []
                    }
                }
                rooms.push(newRoom);
                socket.join(newRoom.id);
                io.emit('allRooms', rooms);
                io.to(newRoom.id).emit('newInfoRoom', newRoom);
                roomToJoin = newRoom;
            });
        }
        socket.emit('newRoomInfo', roomToJoin);
    });

    //Join Room
    socket.on('joinRoom', (data) => {
        let findRoom = rooms.find(room => room.id == data.id);
        if (findRoom == undefined) {
            return;
        } else {
            let newUser = { id: socket.id, name: data.user.name, state: null, image: data.user.image };
            findRoom.users.push(newUser);
            findRoom.accesible = false;
            findRoom.status = 'inLobby';
            findRoom.messages.push({ user: 'Server', message: `${data.user.name} s'ha unit a la sala` });
            socket.join(findRoom.id);
        }
        io.emit('allRooms', rooms);
        io.to(findRoom.id).emit('newInfoRoom', findRoom);
        console.log('soy gay', findRoom);
    });

    //Chat Room
    socket.on('chatMessage', (data) => {
        let room = findRoomByUser(socket.id);
        room.messages.push(data);
        io.to(room.id).emit('newMessage', room.messages);
        io.to(room.id).emit('newInfoRoom', room);
        console.log('chatMessage', room.messages);
        console.log('chatMessage', data);
    });

    //Change State User
    socket.on('changeState', (data) => {
        let room = findRoomByUser(socket.id);
        let user = room.users.find(user => user.id == socket.id);
        user.state = data.state;
        io.to(room.id).emit('newInfoRoom', room);
        console.log('changeState', room);
    });

    //Exit Room
    socket.on('exitRoom', () => {
        let room = findRoomByUser(socket.id);
        console.log(`Socket ${socket.id} is leaving room ${room.id}`);
        if (socket.id == room.admin[0]) {
            if (room.users.length > 1) {
                let name = room.admin[1];
                room.admin[0] = room.users[1].id;
                room.admin[1] = room.users[1].name;
                room.admin[2] = room.users[1].image;
                room.users.splice(0, 1);
                room.accesible = true;
                room.messages.push({ user: 'Server', message: `${name} a sortit de la sala` });
                room.messages = room.messages.filter(message => message.user == 'Server');
                console.log('exitRoom Messages: ', room.messages);
                socket.leave(room.id);
                socket.emit('newInfoRoom', null);
                io.to(room.id).emit('newInfoRoom', room);
            } else {
                rooms.splice(rooms.indexOf(room), 1);
            }
        } else {
            room.messages.push({ user: 'Server', message: `${room.users.find(user => user.id == socket.id).name} a sortit de la sala` });
            room.users.splice(1, 1);
            room.accesible = true;
            socket.leave(room.id);
            room.messages = room.messages.filter(message => message.user == 'Server');
            console.log('exitRoom Messages: ', room.messages);
            socket.emit('newInfoRoom', null);
            io.to(room.id).emit('newInfoRoom', room);
        }
        io.emit('allRooms', rooms);
    });

    socket.on('startGame', () => {
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
                    colorsUnlocked: ['white'],
                    color: 'white'
                },
                {
                    id: room.users[1].id,
                    name: room.users[1].name,
                    x: 0,
                    y: 0,
                    direction: 'right',
                    colorsAvailable: ['black', 'blue', 'orange'],
                    colorsUnlocked: ['black'],
                    color: 'black'
                }
            ];
            console.log("Room CCCCCCCCCCCCCCCCCCCCCCCCCCCCC", room.game.maps);
        io.to(room.id).emit('gameStarted', room);
    })

    socket.on('updatePosition', (data) => {
        let room = findRoomByUser(socket.id);
        if (room) {
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
        if (newColor) {
            player.color = newColor;
        }
        io.to(room.id).emit('changeColorFront', player);
    });

    socket.on('death', () => {
        io.to(findRoomByUser(socket.id).id).emit('deathFront')
    });

    socket.on('win', () => {
        let room = findRoomByUser(socket.id);
        room.game.currentMap++;
        if (room.game.currentMap == room.game.maps.length) {
            io.to(findRoomByUser(socket.id).id).emit('finishGame')

        } else {
            if (room.game.currentMap == 1) {
                room.game.playersData[0].colorsUnlocked = ['red'];
                room.game.playersData[0].color = 'red';
                room.game.playersData[1].colorsUnlocked = ['blue'];
                room.game.playersData[1].color = 'blue';

                fetch("localhost:8000/api/saves", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: room.users[0].id,
                        FirstMap: room.game.maps[1].id,
                        SecondMap: room.game.maps[2].id,
                        ThirdMap: room.game.maps[3].id,
                        state: room.game.currentMap

                    })
                })
            } else {
                if (room.game.currentMap == 2) {
                    room.game.playersData[0].colorsUnlocked.push('green');
                    room.game.playersData[1].colorsUnlocked.push('orange');
                } else {
                    room.game.playersData[0].colorsUnlocked.push('white');
                    room.game.playersData[1].colorsUnlocked.push('black');
                }

            }
            room.game.currentMap = room.game.maps[room.game.maps.indexOf(room.game.currentMap) + 1];
            io.to(findRoomByUser(socket.id).id).emit('winFront', room.game)
        }
        io.to(findRoomByUser(socket.id).id).emit('winFront')
    });

    //Disconnect
    socket.on('disconnect', () => {
        let room = findRoomByUser(socket.id);

        if (room && room.status == 'Waiting') {
            rooms.splice(rooms.indexOf(room), 1);
        } else if (room && room.status == 'inLobby') {
            if (room.users.length > 1 && socket.id == room.admin[0]) {
                let name = room.admin[1];
                room.admin[0] = room.users[1].id;
                room.admin[1] = room.users[1].name;
                room.admin[2] = room.users[1].image;
                room.users.splice(0, 1);
                room.accesible = true;
                room.status = 'Waiting';
                room.messages.push({ user: 'Server', message: `${name} a sortit de la sala` });
                room.messages = room.messages.filter(message => message.user == 'Server');
                console.log('exitRoom Messages: ', room.messages);
                socket.leave(room.id);
                socket.emit('newInfoRoom', null);
                io.to(room.id).emit('newInfoRoom', room);
            } else if (room.users.length > 1 && socket.id != room.admin[0]) {
                room.messages.push({ user: 'Server', message: `${room.users.find(user => user.id == socket.id).name} a sortit de la sala` });
                room.users.splice(1, 1);
                room.accesible = true;
                room.status = 'Waiting';
                room.messages = room.messages.filter(message => message.user == 'Server');
                console.log('exitRoom Messages: ', room.messages);
                socket.leave(room.id);
                socket.emit('newInfoRoom', null);
                io.to(room.id).emit('newInfoRoom', room);
            } else if (room.users.length == 1 && socket.id == room.admin[0]){
                rooms.splice(rooms.indexOf(room), 1);
            }
        } else if (room && room.status == 'Playing') {
            room.game.playersData = room.game.playersData.filter(player => player.id != socket.id);
            room.game.players = room.game.players.filter(player => player.id != socket.id);
            room.users = room.users.filter(user => user.id != socket.id);
            rooms.splice(rooms.indexOf(room), 1);
            socket.leave(room.id);
            socket.emit('newInfoRoom', null);
        }
        io.emit('allRooms', rooms);
        
        console.log(`Disconnected: ${socket.id}`);
    });
});


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})