const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
const port = process.env.PORT || 3000; // Add a default port if not provided

app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('User connected');

    // Handle messages
    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
