import express from 'express';
import { join } from 'path';
import cors from 'cors';
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();

// var partida = [];

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
    // partida.push(data);
    // console.log('data', data);
    // console.log('partida', partida);
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

server.listen(5176, 'localhost', () => {
  console.log('Server running at http://localhost:5176');
});