//Making connection of client with server
//This js is running on Frontend
// io is coming from cdn library of socket that loads on browser frontend
window.addEventListener('load' , ()=>{
    var socket = io.connect('https://floating-wave-94000.herokuapp.com/');



//Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

//Emit Events
btn.addEventListener('click' ,function(){
    socket.emit('chat' ,{           //here 'chat' is the name of your msg
        message:message.value,
        handle:handle.value
    });
   
});


//It will emit data 
message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
    
})

//Listen for Events
//socket.on is for listening the msg coming to it
//socket.on will recieve msg
socket.on('chat' ,function(data){
    feedback.innerHTML ="";
    message.value="";
    output.innerHTML+='<p><strong>' + data.handle + ': </strong>' + data.message +'</p>';
});

//It will recieve data
socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
});