var express = require('express')
var app = express();
var http =  require('http').Server(app);
var io = require('socket.io')(http);

// To load static files
app.use(express.static(__dirname+'/src'));

io.on('connection' , function(socket){
    console.log('we have a connection');
    socket.on("new-message", function(msg){
        io.emit("receive-message" , msg);
    })
})

// server listening on port 3000
http.listen('3000' , function(){
    console.log('Server started');
})