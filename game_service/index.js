const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
    socket.on("createLobby", () => {
        let id = Date.now()+"";
        socket.join(id);
        socket.on("board_change",(board)=>{
            console.log("board")
            io.sockets.in(id).emit("board_change",board);
        });
        io.sockets.in(id).emit("id_room",id);
    })

    socket.on("joinLobby", (room) => {
        socket.join(room);

        socket.on("board_change",(board)=>{
            console.log("board")
            io.sockets.in(room).emit("board_change",board);
        });

        io.sockets.in(room).emit("id_room",room);
        io.sockets.in(room).emit("nb_player",io.sockets.adapter.rooms.get(room).size)
    })

    socket.on("nb_player", (room) => {
        io.sockets.in(room).emit("nb_player",io.sockets.adapter.rooms.get(room).size)
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