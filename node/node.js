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


});

server.listen(3001, 'localhost', () => {
  console.log('Server running at http://localhost:3001');
});
