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
var time = 0

function update(){
    time+=1
    setItemTime()
    if(time >=45 && messageQueue.items.size>1){
        time = 0
        messageQueue.dequeue()
        setItemTime()
        io.sockets.emit('current-message',messageQueue.peek());
        console.log("broadcasted latest message")
        messageQueue.printQueue()
    }
}

function setItemTime(){
    messageQueue.peek().time = (messageQueue.items.length==1) ? -1: time 
}

let timerId = setInterval(() => update(), 1000);

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