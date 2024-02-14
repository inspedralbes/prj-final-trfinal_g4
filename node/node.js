const express = require("express")
const app = express();
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io");

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('eyyy');
})

//VARIABLES

var rooms = []
var lastRoom = 0

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  console.log('Salas: ', io.sockets.adapter.rooms);

  socket.on("join", (data) => {
    console.log("soy", data);

    if(rooms.length == 0) {
      rooms.push({ idRoom: lastRoom, name: data, users: []})
    }else{
      if(rooms[rooms.length - 1].users.length == 2) {
        lastRoom++
        rooms.push({ idRoom: lastRoom, name: data, users: []})
        }
    }
    socket.join(data);
    console.log(data);
    socket.emit('updateUsers', [])
    console.log(rooms);
    io.to(data).emit('usersConnected' )
    console.log('Salas: ', io.sockets.adapter.rooms);

    socket.emit('updateRooms', Object.keys(io.sockets.adapter.rooms));
    
  })

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data)
    console.log(data);

  })

  socket.on('publicRooms', (rooms) => {

  })

  socket.on('disconnectUserRoom', () => {

    for(const room in rooms) {
      const index = rooms[room].indexOf(socket.id)
      if(index !== -1) {
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