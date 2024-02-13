const express = require("express")
const app = express();
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io")

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

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
  })

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data)
    console.log(data);

  })

  socket.on('register', async (data) => {
    try{
      const strapiRes = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'applicacion/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if(strapiRes.ok)
      {
        const strapiData = await strapiRes.json()
        console.log('resposta strapi: ', strapiData);
        io.to(data.room).emit('register', strapiData)
      }else
      {
        console.log('Error! Usuario no registrado en Strapi');
      }

    }catch(error)
    {
      console.error('Error! Solicitud Denegada!');
    }
  })

  
});

server.listen(3001, 'localhost', () => {
  console.log('Server running at http://localhost:3001');
});
