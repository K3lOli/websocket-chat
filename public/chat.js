const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

//emit => para emitir uma informação e o on => para receber uma informação

socket.emit('joinRoom', {
    username, 
    room,
});

document.getElementById("message_input").addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        const message = event.target.value;
        const data = {
            room, 
            message, 
            username
        }
        console.log(message);

        socket.emit("message", data)
        
        event.target.value = " ";
    }
})

console.log(username, room);