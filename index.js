//This js is running on Server
var express = require("express");
var socket = require('socket.io');
var app = express();
var port = process.env.PORT || 5000;
//app.set('port',(process.env.PORT || 5000));
var server = app.listen(port, function(){
    console.log("listening to 3000");
});
app.use(express.static('public'));

//Socket Setup - we want socket.io to work on this server
var io = socket(server);

//Listening for event 'connection' with browser
//Har connection ka apna socket hoga
io.on('connection',function(socket){
    console.log("socket connction made");
    socket.on('chat',function(data){
        //io.sockets is all sockets/connections with server
        io.sockets.emit('chat',data);
    })
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    })
})
