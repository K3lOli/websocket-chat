import { serverHttp, io } from "./http";
import "./websocket"

const PORT = 3000;

serverHttp.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})