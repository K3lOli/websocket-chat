import { serverHttp, io } from "./http";
import "./websocket"

const port = process.env.PORT || 3000;

serverHttp.listen(port, () => {
    console.log('Server is listening on port ' + port)
})