const express = require('express');
const cors = require('cors');
const app = require('http').createServer();
const io = require('socket.io')(app, {
  cors: {
    origin: 'http://localhost:8000',
    credentials: true
  }
});

io.on('connection', (socket) => {
    console.log('Connection to client established');

    socket.on('userId', (username) => {
        console.log(username)
        io.emit('respond', (username));
    });

    socket.on('disconnect', (username)=>{
        console.log('disconnected from user ', username);
    });

    socket.use((packet, next) => {
        const headers = {
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Content-Type'
        };
        socket.handshake.headers = Object.assign({}, socket.handshake.headers, headers);
        next();
    });
});

app.listen(5000, function() {
    console.log('listening on *:5000');
});