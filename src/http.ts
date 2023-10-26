import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use(express.static(path.join(__dirname,"..","public")));//Definindo a pasta public como a pasta de arquivos estáticos

const serverHttp = http.createServer(app);

const io = new Server(serverHttp); //Servidor com o socket

export { serverHttp, io }; //Exportando o servidor e o socket