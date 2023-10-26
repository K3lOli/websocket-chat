"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
const mysql_1 = require("./mysql");
const users = [];
//o ideal é armazenar em um banco de dados
const messages = [];
http_1.io.on("connection", (socket) => {
    //o socket é direcionado para o cliente, se for para toda a aplicação, usar o io
    socket.on("joinRoom", (data, callback) => {
        console.log(data);
        socket.join(data.room); //entrando na sala
        //verificando se o usuário já está na sala
        const userInRoom = users.find((user) => user.username === data.username && user.room === data.room);
        if (userInRoom) {
            userInRoom.socket_id = socket.id;
        }
        else {
            users.push({
                room: data.room,
                username: data.username,
                socket_id: socket.id,
            });
        }
        console.log(users);
        //salvando as informações do usuário
        // const messagesRoom = getMessagesRoom(data.room);
        // callback(messagesRoom);
        getMessagesFromDatabase(data.room, (messages) => {
            callback(messages);
        });
    });
    socket.on("message", data => {
        const message = {
            room: data.room,
            text: data.message,
            username: data.username,
            createAt: new Date()
        };
        insertData(message);
        // dbConnection.query(
        //     'INSERT INTO messages (room, username, text, createAt) VALUES (?, ?, ?, ?)',
        //     [message.room, message.username, message.text, message.createAt],
        //     (err: NodeJS.ErrnoException | null, results: ResultSetHeader) => {
        //         if(err){
        //             console.log(err);
        //             return;
        //         }else{
        //             console.log("Mensagem salva com sucesso!");
        //         }
        //         console.log(results);
        //     }
        // )
        messages.push(message);
        console.log(message);
        http_1.io.to(data.room).emit("message", message);
    });
});
function getMessagesRoom(room) {
    const messagesRoom = messages.filter(message => message.room === room);
    return messagesRoom;
}
// function getMessagesFromDatabase(room: string, callback: (messages: Message[]) => void){
//     dbConnection.query(
//     'SELECT * FROM messages WHERE room = ?',
//     [room],
//     (err: NodeJS.ErrnoException | null, results: any) => {
//       if (err) {
//         console.log(err);
//         callback([]);
//       } else {
//         // Faça a conversão do resultado para o tipo Message[]
//         const messages: Message[] = results as Message[];
//         callback(messages);
//       }
//     }
//   );
// }
function getMessagesFromDatabase(room, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, mysql_1.dbConnection)();
        const [rows, fields] = yield connection.execute('SELECT * FROM messages WHERE room = ?', [room]);
        const messages = rows;
        callback(messages);
    });
}
function insertData(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, mysql_1.dbConnection)();
        try {
            const query = 'INSERT INTO messages (room, username, text, createAt) VALUES (?, ?, ?, ?)';
            const values = [message.room, message.username, message.text, message.createAt];
            yield connection.execute(query, values);
            console.log('Dados inseridos com sucesso.');
        }
        catch (error) {
            console.error('Erro ao inserir dados no banco de dados:', error);
        }
        finally {
            connection.end();
        }
    });
}
