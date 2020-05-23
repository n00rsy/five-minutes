const express = require("express");
const http = require("http")
const socketIo = require("socket.io")

const port = process.env.port || 4001;
const index = require("./routes/index")

const app = express();
app.use(index);

const server = http.createServer(app)

const io = socketIo(server)

io.on("connection", (socket)=>{
    socket.emit('current-fame', 'Larry Wheels')
    console.log("new connection")
    
    socket.on('disconnect', (reason)=>{
        console.log("disconnected")
    })
    socket.on('form-submit', data =>{
        console.log("form submit: "+data);
    })
})



server.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})