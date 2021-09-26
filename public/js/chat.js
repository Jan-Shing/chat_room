const socket = io();

const $messageInput = document.querySelector('#message-input');
const $messages = document.querySelector('#messages');


//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message
    });
    $messages.insertAdjacentHTML('beforeend', html);
})

// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

document.querySelector("#message-form").addEventListener('submit', (e) => {
    e.preventDefault();
   // let message = e.target.elements.message.value;
   let message = $messageInput.value;
    
    socket.emit('sendMessage', message, (err) => {
        $messageInput.value = "";
        $messageInput.focus();
        if(err){
            console.log(err);
        }else{
            console.log("message to sever done...");
        }
    });
});

// socket.on('countUpated', (count)=>{
//     console.log("The count has been updated!", count);
// })

// document.querySelector("#increment").addEventListener('click', ()=> {
//     console.log("click");
//     socket.emit("increment");
// })

socket.emit('Join', {username, room})