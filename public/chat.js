const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

//emit => para emitir uma informação e o on => para receber uma informação

socket.emit('joinRoom', {
    username, 
    room,
})

console.log(username, room);