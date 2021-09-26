const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {addUser, removeUser, getUser, getUserList} = require("./user");

const app = express();
const server = http.createServer(app);
const io = socketio(server); // socket io need http server


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));


let count = 0;


io.on('connection', (socket) => {
    console.log('New websocket connection');
    socket.emit("message", "Welcome to this chatter room");

    

    socket.on('Join', ({username, room}) => {
        socket.broadcast.emit('message', username + " joined...");
    })

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message);
        callback();
    });
    // socket.emit('countUpated', count); //count updated event

    // socket.on('increment', () => {
    //     count++;
    //     //socket.emit("countUpated", count); emit will only send message to certain socket
    //     io.emit('countUpated', count);
    // })

    socket.on('disconnect',() => {
        io.emit('message', "A user leaved....");
    })
})

console.log('hidd');
server.listen(port, ()=> {
    console.log(`Server is up on port ${port}!`);
})