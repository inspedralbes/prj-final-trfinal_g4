const express = require("express")
const app = express();
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io");
const { log } = require("console");

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const User = require('../back/strapi/src/api/user/services/user.js');
const user = require("../back/strapi/src/api/user/services/user.js");

app.get('/', (req, res) => {
  res.send('eyyy');
})

//VARIABLES

var rooms = []
var lastRoom = 0

const urlStrapi = 'http://localhost:1337/api/auth/local/';

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  console.log('Salas: ', io.sockets.adapter.rooms);

  socket.on('crearSala', (data) => {
    console.log(data);
    socket.join(data);
    console.log('se ha unido a la sala', data);
    console.log('Salas: ', io.sockets.adapter.rooms);

    if (rooms.length == 0) {
      rooms.push({ idRoom: lastRoom, name: data, users: [] });
    } else {    
      lastRoom++;
      rooms.push({ idRoom: lastRoom, name: data, users: [] });
    }
    
  });

  socket.on("join", async (data) => {
    console.log("soyyyyy la sala ", data);
    
    // // Busca al usuario en la base de datos
    // const user = await findUser(data);
    const response = await fetch(urlStrapi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: data.username,
      }),
    });
    const user = await response.json();
    console.log(user);
    rooms.push({ idRoom: lastRoom, name: data, users: user });
    console.log(rooms);
  });
    
    
    // const user = await User.obtenerInformacionUsuari('id', 'username');
    
    // if (rooms.length == 0) {
    //   rooms.push({ idRoom: lastRoom, name: data, users: [user.username] });
    // } else {
    //   if (rooms[rooms.length - 1].users.length == 2) {
    //     lastRoom++;
    //     rooms.push({ idRoom: lastRoom, name: data, users: [user.username] });
    //   } else {
    //     rooms[rooms.length - 1].users.push(user.username);
    //   }
    // }

    // // Busca la sala por nombre
    // const room = rooms.find(room => room.name === 'nombre de la sala');

    // // Si la sala existe, agrega el usuario
    // if (room) {
    //   room.users.push(user.username);
    // } else {
    //   // Si la sala no existe, crea una nueva sala con el usuario
    //   rooms.push({ idRoom: lastRoom, name: data, users: [user.username] });
    // }

    // socket.join(user.username);
    // console.log('se ha unido a la sala', user.username);
    // socket.emit('updateUsers', []);
    // console.log(rooms);
    // io.to(user.username).emit('usersConnected');
    // console.log('Salas: ', io.sockets.adapter.rooms);

    // socket.emit('updateRooms', Object.keys(rooms));
  // });
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data)
    console.log(data);

  })

  socket.on('publicRooms', (rooms) => {

  })

  socket.on('disconnectUserRoom', () => {

    for (const room in rooms) {
      const index = rooms[room].indexOf(socket.id)
      if (index !== -1) {
        rooms[room].splice(index, 1)
        io.to(room).emit("updateUsers", rooms[room])
        break;
      }
    }
  });


});

server.listen(3001, 'localhost', () => {
  console.log("\x1b[31m  ____  _            _           _      _           ");
  console.log(" / ___|| |_ __ _  __| |_   _ ___| |_   (_)_ __ ___  ");
  console.log("| |    | __/ _` |/ _` | | | / __| __|  | | '__/ _ \\ ");
  console.log("| |___ | || (_| | (_| | |_| \\__ \\ |_   | | | |  __/ ");
  console.log(" \\____| \\__\\__,_|\\__,_|\\__, |___/\\__|  |_|_|  \\___| ");
  console.log("                        |___/                        ");
  console.log("\x1b[34m   ____  _            _   _               _           ");
  console.log("  / ___|| |_ __ _  __| | | |_   _    __| | ___  ___ ");
  console.log("  \\___ \\| __/ _` |/ _` | | | | | |  / _` |/ _ \\/ __|");
  console.log("   ___) | || (_| | (_| | | | | |_| | (_| |  __/\\__ \\");
  console.log("  |____/ \\__\\__,_|\\__,_| |_|  \\__,_|\\__,_|\\___||___/");
  console.log("\x1b[0mServer running at http://localhost:3001");
});