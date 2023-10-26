import { io } from "./http";

io.on("connection", (socket) => {
    //o socket é direcionado para o cliente, se for para toda a aplicação, usar o io
    socket.on("joinRoom", (data) => {
        console.log(data)
    })
});