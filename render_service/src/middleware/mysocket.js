const { io } = require("socket.io-client")

const socket = io("http://localhost:3003/", {
   transports: ['websocket']
});

socket.on("message", () => {
    console.log("message reçu");
})

module.exports=socket;