const chatForm = document.getElementById('chat-form');

const socket = io();
socket.on('message', message => {
    console.log(message);
    outPutMessage(message)
})

// message submit
chatForm.addEventListener('submit', (e) => {
e.preventDefault();

const msg = e.target.elements.msg.value;

// emitting message to server
socket.emit('chatMessage',msg)

})

function outPutMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${message}</p>`;
    document.querySelector('.chat-messages').appendChild(div); 
}