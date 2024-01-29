const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        //origin: ["https://chatsy-entry.netlify.app" , "https://chatsy-chat.netlify.app" , "https://official-entry-point.development98979.repl.co" , "https://chatsyonline.web.app"],
        methods: ["GET", "POST"]
    }
});
const port =  process.env.PORT;

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
