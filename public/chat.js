//Making connection of client with server
//This js is running on Frontend
// io is coming from cdn library of socket that loads on browser frontend
var socket = io.connect('http://localhost:3000');

//Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

//Emit Events
window.addEventListener('load' , ()=>{
btn.addEventListener('click' ,function(){
    socket.emit('chat' ,{           //here 'chat' is the name of your msg
        message:message.value,
        handle:handle.value
    });
});
});

//
message.addEventListener('keypress',function(){
    socket.on('typing',handle.value+"is typing a message");
})

//Listen for Events
//socket.on is for listening the msg coming to it
socket.on('chat' ,function(data){
    feedback.innerHTML ="";
    output.innerHTML+='<p><strong>' + data.handle + ': </strong>' + data.message +'</p>';
});

//
socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});