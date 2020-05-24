const express = require("express");
const http = require("http")
const socketIo = require("socket.io")
const Queue = require("./queue")

const port = process.env.port || 4001;
const index = require("./routes/index")

//set up server and socketio
const app = express();
app.use(index);
const server = http.createServer(app)
const io = socketIo(server)

var messageQueue = new Queue();
messageQueue.enqueue({
    name: 'Noor Syed',
    message: 'this is from the server'
});
//implementation plan:
/*
on connect:
    emit current message + time of switch
on switch/ every 45 seconds:
    broadcast new message + time of next switch


*/


io.on("connection", (socket) => {

    socket.emit('current-message', messageQueue.peek())
    console.log("new connection")

    socket.on('disconnect', (reason) => {
        console.log("disconnected")
    })
    socket.on('form-submit', data => {
        messageQueue.enqueue(data)
        messageQueue.printQueue()
    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})