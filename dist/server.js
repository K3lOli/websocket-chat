"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
require("./websocket");
const PORT = 3000;
http_1.serverHttp.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
