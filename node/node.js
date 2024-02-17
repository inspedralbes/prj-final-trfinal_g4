const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


let rooms = [];
let lastRoom = 0;




io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('userConnected', ({ username }) => {
    console.log(`User connected: ${username}`);
  });

  socket.on('joinRoom', () => {
    console.log(socket.id);
    if (rooms.length === 0) {
      rooms.push({ id: lastRoom, users: [] });
      rooms[0].users.push({ x: 0, y: 0, id: socket.id });
      console.log(rooms);
      socket.join(lastRoom);
      io.to(lastRoom).emit('updateData', lastRoom);
    } else {
      console.log(rooms[rooms.length - 1].users);
      if (rooms[rooms.length - 1].users.length === 2) {
        rooms.push({ id: lastRoom, users: [{ x: 0, y: 0, id: socket.id }] });
        socket.join(lastRoom);
        io.to(lastRoom).emit('updateData', lastRoom);
      } else {
        rooms[rooms.length - 1].users.push({ x: 0, y: 0, id: socket.id });
        socket.join(lastRoom);
        io.to(lastRoom).emit('updateData', lastRoom);
        lastRoom++;
      }
    }
  });
  //   io.to(lastRoom).emit('updateData', rooms[rooms.length - 1]);
  //   lastRoom++;
  // });
  // socket.on('userConnected', ({ username }) => {
  //   console.log(`User connected: ${username}`);
  // });


  // socket.on('join', (room) => {
  //   console.log(`Socket ${socket.id} joining ${room}`);
  //   socket.join(room);
  //   const index = rooms.findIndex((r) => r.id === room);
  //   console.log('Index:', index);
  //   if (index !== -1) {
  //     rooms[index].users.push({ user: data.username, x: 0, y: 0, id: socket.id });
  //   }
  //   io.to(data.id).emit('join', data);
  // });

  // socket.on('createRoom', (room) => {
  //   if (room.password === '') room.password = null;

  //   // Define newRoom
  //   const newRoom = {
  //     users: [{ user: room.username, x: 0, y: 0, id: socket.id }],
  //     password: room.password,
  //     started: false,
  //     level: 1,
  //     id: lastRoom,
  //     map: map,
  //   };

  //   // Insert newRoom into rooms
  //   rooms.push(newRoom);

  //   console.log('Rooms:', rooms);
  //   socket.join(lastRoom);
  //   lastRoom++;
  //   io.emit('updateRooms', rooms);
  // });
  // fetch('http://localhost:1337/api/map', {
  //   method: 'GET',
  //   body: JSON.stringify(1),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((map) => {
  //     rooms.push({
  //       users: [{ user: room.username, x: 0, y: 0, id: socket.id }],
  //       password: room.password,
  //       started: false,
  //       level: 1,
  //       id: lastRoom,
  //       map: map,
  //     });

  //socket.broadcast.emit('updateRooms', rooms);
  //   });

  socket.on('chat message', (dataMessage) => {
    const { msg, room } = dataMessage;
    console.log(`msg: ${msg}, room: ${room}`);
    io.to(room).emit('chat message', msg);
  });


  // socket.on('userConnected', ({ username }) => {
  //   console.log(`User connected: ${username}`);
  // });


  // socket.on('join', (room) => {
  //   console.log(`Socket ${socket.id} joining ${room}`);
  //   socket.join(room);
  //   const index = rooms.findIndex((r) => r.id === room);
  //   console.log('Index:', index);
  //   if (index !== -1) {
  //     rooms[index].users.push({ user: data.username, x: 0, y: 0, id: socket.id });
  //   }
  //   io.to(data.id).emit('join', data);
  // });

  // socket.on('createRoom', (room) => {
  //   if (room.password === '') room.password = null;

  //   // Define newRoom
  //   const newRoom = {
  //     users: [{ user: room.username, x: 0, y: 0, id: socket.id }],
  //     password: room.password,
  //     started: false,
  //     level: 1,
  //     id: lastRoom,
  //     map: map,
  //   };

  //   // Insert newRoom into rooms
  //   rooms.push(newRoom);

  //   console.log('Rooms:', rooms);
  //   socket.join(lastRoom);
  //   lastRoom++;
  //   io.emit('updateRooms', rooms);
  // });
  // // fetch('http://localhost:1337/api/map', {
  // //   method: 'GET',
  // //   body: JSON.stringify(1),
  // //   headers: {
  // //     'Content-Type': 'application/json',
  // //   },
  // // })
  // //   .then((response) => response.json())
  // //   .then((map) => {
  // //     rooms.push({
  // //       users: [{ user: room.username, x: 0, y: 0, id: socket.id }],
  // //       password: room.password,
  // //       started: false,
  // //       level: 1,
  // //       id: lastRoom,
  // //       map: map,
  // //     });

  // //socket.broadcast.emit('updateRooms', rooms);
  // //   });

  socket.on('chat message', (dataMessage) => {
    const { msg, room } = dataMessage;
    console.log(`msg: ${msg}, room: ${room}`);
    io.to(room).emit('chat message', msg);
  });

  socket.on('register', async (data) => {
    console.log('register -->', data);
    const response = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    io.to(data.room).emit('register', data);
  });

  socket.on('login', async (data) => {
    console.log('login -->', data);
    const response = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
  socket.on('changeMove', (data) => {
    console.log('updatePosition -->', data);
    // let room = rooms.findIndex((r) => r.id === data.room);
    // console.log('room:', data);
    // if (rooms[room]?.users[0]?.id === socket.id) {
    //   rooms[room].users[0].x = data.x;
    //   rooms[room].users[0].y = data.y;
    // } else {
    //   rooms[room].users[1].x = data.x;
    //   rooms[room].users[1].y = data.y;
    // }

    io.to(data.room).emit('updatePosition', data);
  });

  // socket.on('win', (data) => {
  //   let room = rooms.findIndex((r) => r.id === data.room);
  //   rooms[room].level++;
  //   rooms[room].map = getNewLevel(rooms[room].level);
  //   io.to(data.room).emit('win', rooms[room]);
  // });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

server.listen(3001, 'localhost', () => {
  console.log('Server running at http://localhost:3001');
});