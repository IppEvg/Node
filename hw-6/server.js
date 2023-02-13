import http from "http"
import fs from "fs"
import path from "path"
import { Server } from "socket.io"

const host = "localhost";
const port = 3000;
let arr = [];
const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        const filePath = path.join(process.cwd(), "./index.html");
        const rs = fs.createReadStream(filePath);
        rs.pipe(res);
    }
});

const io = new Server(server);
io.on("connection", (client) => {
    const clientId = client.id;
    let id = clientId.slice(10, 15);
    console.log(`Соединение установлено. Id клиента: ${id}`);

    arr.push(id);
    let i = arr.length
    client.broadcast.emit("server-count", i);
    client.emit("server-count", i);

    client.on("client-msg", (data, clientName) => {

        client.broadcast.emit("server-msg", { msg: data.msg }, clientName);
        client.emit("server-msg", { msg: data.msg }, clientName)
    })
})

server.listen(port, host, () => {
    console.log(`Сервер создан на http//${host}:${port}`);
})
