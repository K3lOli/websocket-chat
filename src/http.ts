import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname,"..","public")));//Definindo a pasta public como a pasta de arquivos estáticos

const serverHttp = http.createServer(app);//usa-se a biblioteca http para criar um servidor separado que pode ser usado para o socket

const io = new Server(serverHttp, {
    cors: {
		origin: process.env.PORT || "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	}
}); //Servidor com o socket

export { serverHttp, io }; //Exportando o servidor e o socket