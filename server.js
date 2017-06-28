var express = require('express')

var app = express();
var http =  require('http').Server(app);
var io = require('socket.io')(http);

//To load static files
app.use(express.static(__dirname+'/src'));

io.on('connection' , function(socket){
    socket.on("new-message", function(msg){
        io.emit("receive-message" , msg);
    })
})

http.listen('3000' , function(){
    console.log('Server started');
})