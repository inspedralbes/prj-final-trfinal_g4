import express from 'express';
import { Server } from 'socket-io';
import { createServer } from 'node:http';
import { join } from 'node:path';
import cors from 'cors';

const app = express();

app.use(cors());
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: [
            'GET' , 'POST',
            ],
        },
    });

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('User connected');
    

})

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});