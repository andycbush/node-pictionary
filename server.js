var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


io.on('connection', function (socket) {
    
    //logs the new client connected message
    console.log('New client connected');

    socket.on('draw', function(position) {
        console.log('Received drawing', position);
        socket.broadcast.emit('draw',position);
    });
    
    socket.on('theguess',function(theguess) {
        console.log('User guessed1:',theguess);
        socket.broadcast.emit('theguess',theguess);
    });

    socket.on('disconnect', function() {
        console.log('A user has disconnected');
    });

});
server.listen(process.env.PORT || 8080);