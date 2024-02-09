const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();

var partida = [];

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', (data) => {
    socket.join(data);
    partida.push(data);
    console.log('data', data);
    console.log('partida', partida);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('register', async (data) => {
    console.log('funciona', data);
    io.to(data.room).emit('register', data);
  });

  socket.on('login', async (data) => {
    console.log('funciona', data);
    io.to(data.room).emit('login', data);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

server.listen(5176, 'localhost', () => {
  console.log('Server running at http://localhost:5176');
});