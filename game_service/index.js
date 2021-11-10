const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');
const { connect } = require('http2');

app.use(cors());
io.on('connection', (socket) => {
    socket.on("createLobby", () => {
      let id = Date.now();
        socket.join(id);
        console.log(id);
        
    })
       socket.on("joinLobby", (room) => {
      
        socket.join(room);
           io.sockets.in(room).emit("message","Hello");
    })
    
    
    console.log('a user connected');
    socket.emit("connected", true);
    
});

app.get('/', (req, res) => {
    res.send("Hello");
});



server.listen(3003, () => {
  console.log('listening on *:3003');
});