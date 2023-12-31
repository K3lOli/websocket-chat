// import { ResultSetHeader } from "mysql2";
import { io } from "./http";
import { dbConnection } from "./mysql";

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

        // const messagesRoom = getMessagesRoom(data.room);
        // callback(messagesRoom);
        getMessagesFromDatabase(data.room, (messages) => {
            callback(messages);
        });
    });

    socket.on("message", data => {
        const message: Message = {
            room: data.room,
            text: data.message,
            username: data.username,
            createAt: new Date()
        }

        
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

        io.to(data.room).emit("message", message);
    })
});

function getMessagesRoom(room: string){
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

async function getMessagesFromDatabase(room: string, callback: (messages: Message[]) => void){
    const connection = await dbConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM messages WHERE room = ?', [room]);
    const messages: Message[] = rows as Message[];
    callback(messages);
}

async function insertData(message: Message){
    const connection = await dbConnection();
    try {
      const query = 'INSERT INTO messages (room, username, text, createAt) VALUES (?, ?, ?, ?)';
      const values = [message.room, message.username, message.text, message.createAt];
      await connection.execute(query, values);
      console.log('Dados inseridos com sucesso.');
    } catch (error) {
      console.error('Erro ao inserir dados no banco de dados:', error);
    } finally {
      connection.end();
    } 
}