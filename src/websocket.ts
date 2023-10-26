import { io } from "./http";

interface RoomUser{
    socket_id: string,
    username: string,
    room: string,
}

interface Message{
    room: string,
    text: string,
    createAt: Date,
    username: string,
}

const users: RoomUser[] = [];

//o ideal é armazenar em um banco de dados
const messages: Message[] = [];

io.on("connection", (socket) => {
    //o socket é direcionado para o cliente, se for para toda a aplicação, usar o io
    socket.on("joinRoom", (data, callback) => {
        console.log(data);

        socket.join(data.room); //entrando na sala

        //verificando se o usuário já está na sala
        const userInRoom = users.find((user) => user.username === data.username && user.room === data.room);

        if(userInRoom){
            userInRoom.socket_id = socket.id;
        }else{
            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id,
            })
        }
        console.log(users);
        //salvando as informações do usuário

        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
    });

    socket.on("message", data => {
        const message: Message = {
            room: data.room,
            text: data.message,
            username: data.username,
            createAt: new Date()
        }
        

        messages.push(message);
        console.log(message);

        io.to(data.room).emit("message", message);
    })
});

function getMessagesRoom(room: string){
    const messagesRoom = messages.filter(message => message.room === room);
    return messagesRoom;
}