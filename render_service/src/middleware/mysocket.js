const { io } = require("socket.io-client")

const hostname = new URL(window.location.href).hostname;

const socket = io("http://"+hostname+":3003/", {
   transports: ['websocket']
});

socket.on("message", () => {
    console.log("message reçu");
})

module.exports=socket;