"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.serverHttp = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public"))); //Definindo a pasta public como a pasta de arquivos estáticos
const serverHttp = http_1.default.createServer(app); //usa-se a biblioteca http para criar um servidor separado que pode ser usado para o socket
exports.serverHttp = serverHttp;
const io = new socket_io_1.Server(serverHttp); //Servidor com o socket
exports.io = io;
