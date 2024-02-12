import express from 'express';
import { join } from 'path';
import cors from 'cors';
import { createServer} from 'node:http';
// const http = require('http');
import { Server } from 'socket.io';

const server = createServer();

// var partida = [];
const app = express();

var rooms = [];
app.get('/api', (req, res) => {
  res.send('server node');
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
    const index = rooms.findIndex((r) => r.id === room);
    console.log('Index:', index);
    if (index !== -1) {
      rooms[index].users.push(socket.id);
    }
    // partida.push(data);
    // console.log('data', data);
    // console.log('partida', partida);
  });

  socket.on('createRoom', (room) => {
    rooms.push({"users":[socket.id], "password": room.password, "started": false, level: room.level});
    socket.broadcast.emit('Updaterooms', rooms);
  });
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
    io.to(data.room).emit('login', data);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

app.listen(5000, 'localhost', () => {
  console.log('Server running at http://localhost:5176');
});