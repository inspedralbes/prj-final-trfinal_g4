const express = require("express")
const app = express();
const http = require("http");
// import { join } from 'path';
const cors = require("cors")
// const http = require('http');
const { Server } = require("socket.io")
app.use(cors({
  origin: 'http://localhost:3000',
}))
const server = http.createServer(app);

// var partida = [];

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('eyyy');
})

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
  })

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data)
    console.log(data);

  })

  socket.on("register", async (userData) => {
    console.log(userData);
    try{
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
      const responseData = await response.json();
      if(responseData.ok)
      {
        console.log("user " , userData);
        socket.emit('registerSuccess', userData)
        return responseData
      }else
      {
        console.log(response);
        socket.emit('registerError', responseData.ok)
      }

    }catch(error)
    {
      console.error('Error! Solicitud Denegada!');
    }
  })

  // socket.on('join', (room) => {
  //   console.log(`Socket ${socket.id} joining ${room}`);
  //   socket.join(room);
  //   // partida.push(data);
  //   // console.log('data', data);
  //   // console.log('partida', partida);
  // });

  // socket.on('chat message', (dataMessage) => {
  //   const { msg, room } = dataMessage;
  //   console.log(`msg: ${msg}, room: ${room}`);
  //   io.to(room).emit('chat message', msg);  
  // });

  // socket.on('register', async (data) => {
  //   console.log('register -->', data);
  //   const response = await fetch('http://localhost:1337/api/auth/local/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   io.to(data.room).emit('register', data);
  // });

  // socket.on('login', async (data) => {
  //   console.log('login -->', data);
  //   const response = await fetch('http://localhost:1337/api/auth/local', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   io.to(data.room).emit('login', data);
  // });
  // socket.on('disconnect', () => {
  //   console.log('a user disconnected');
  // });
});

server.listen(3001, 'localhost', () => {
  console.log('Server running at http://localhost:3001');
});