import http from 'http';
import fsp from "fs/promises";
import path from "path";
import fs from "fs";
import { Transform } from 'stream';



const port = 3000;
const host = 'localhost';
const list = [];
const links = (arr, ourUrl) => {
    if (ourUrl.endsWith("/")) {//=== new RegExp('.*\/')
        ourUrl = ourUrl.substring(0, ourUrl.length - 1)
    }
    let li = "";
    for (const item of arr) {
        li += `<li><a href = "${ourUrl}/${item}">${item}</a></li>`
    }
    return li;
}

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        const route = req.url.split("?")[0].trim();
        console.log(process.cwd());
        const dir = path.join(process.cwd(), route);
        console.log(dir);
        fs.stat(dir, (err, stats) => {
            if (!err) {
                if (stats.isFile(dir)) {
                    const rs = fs.createReadStream(dir, 'utf-8');
                    rs.pipe(res);
                } else {
                    fsp
                        .readdir(dir)
                        .then((items) => {
                            if (route !== "/") {
                                items.unshift("..")
                            }
                            return items;
                        })
                        .then((data) => {
                            
                            const filePath = path.join(process.cwd(), "/index.html");
                            const rs = fs.createReadStream(filePath);
                            console.log(filePath);
                            const ts = new Transform({
                                transform(chunk, encoding, callback) {
                                    const li = links(data, route);
                                    this.push(chunk.toString().replace("",`<body><h3>File manager</h3>${li}</body>` ));
                                    callback();
                                },
                            });
                            rs.pipe(ts).pipe(res);
                        });
                }
            } else { res.end("Нет такого пути") }
        })
    } else {
        res.end('Метод не задан')
    }
})
server.listen(port, host, function () {
    console.log(`Сервер запущен на  http://${host}:${port}..`);
})