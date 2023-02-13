import { Router } from 'express';
import http from 'http';
import url from "url"//Модуль url предоставляет утилиты для разрешения и анализа URL
import { updateStrings } from 'yargs';

const port = 3000;
const host = 'localhost';
// Чтобы создать сервер, следует вызвать метод http.createServer().Для обработки подключений
// в метод createServer можно передать специальную функцию:Эта функция принимает два параметра:
//request: хранит информацию о запросе
//response: управляет отправкой ответа
const server = http.createServer((request, response) => {
    // Параметр request позволяет получить информацию о запросе и представляет объект http.IncomingMessage. Отметим некоторые основные свойства этого объекта:
    //headers: возвращает заголовки запроса
    //method: тип запроса (GET, POST, DELETE, PUT)
    //url: представляет запрошенный адрес
    let result;
    if (request.method === "GET") {
        //Как вы видите в примере ниже, метод parse() возвращает объект(из JSON в объект), содержащий все отдельные части URL, такие как протокол, порт, адрес хоста и т.п.
        //var urlapi = require('url'),
        // url = urlapi.parse('http://site.com:81/path/page?a=1&b=2#hash');

        // console.log(
        //     url.href + '\n' +           // the full URL
        //     url.protocol + '\n' +       // http:
        //     url.hostname + '\n' +       // site.com
        //     url.port + '\n' +           // 81
        //     url.pathname + '\n' +       // /path/page
        //     url.search + '\n' +         // ?a=1&b=2
        //     url.hash                    // #hash
        // );
        const queryParams = url.parse(request.url, true).query //В этом примере мы передаём в метод parse url запроса, и вторым параметром передаём true — это
        //значит, что метод распарсит строку запроса и превратит её в объект, доступный по ключу query. Parse- парсим из JSON объект.
        //query-cтрока запроса.Для выполнения запросов у объекта подключения применяется метод query(). Наиболее простая его форма:
        // query(sqlString, callback) 
        // Где sqlString - выполняемая SQL-команда, а callback - функция обратного вызова, через параметры которой мы можем получить результаты выполнения sql-команды или возникшую ошибку.
        console.log(queryParams);
        result = ""
    } else {
        //         Response
        // Параметр response управляет отправкой ответа и представляет объект http.ServerResponse. Среди его функциональности можно выделить следующие методы:
        // .statusCode(): устанавливает статусный код ответа
        // .statusMessage(): устанавливает сообщение, отправляемое вместе со статусным кодом
        // .setHeader(name, value): добавляет в ответ один заголовок
        // .write(): пишет в поток ответа некоторое содержимое
        // .writeHead(): добавляет в ответ статусный код и набор заголовков
        // .end(): сигнализирует серверу, что заголовки и тело ответа установлены, в итоге ответ отсылается клиента. Данный метод должен вызываться в каждом запросе.
        response.statusCode = 405;
        result = 'Method not allowed'
    }
    response.end('<h1>Hello world!!</h1>')
})
//Метод createServer() возвращает объект http.Server. Но чтобы сервер мог прослушивать и обрабатывать входящие подключения,
// у объекта сервера необходимо вызвать метод listen(), в который в качестве параметра передается номер порта, по которому запускается сервер
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})



//**********  GET - запросы*********** 
const users = [
    { name: "Anton", id: 1, age: 25 },
    { name: "Valera", id: 2, age: 35 },
    { name: "Elena", id: 3, age: 30 },
]
const routes = {
    "/": "<h1>Helo!</h1>",
    "/users": users,
    "/users/:id": (params) => { }
}
const findRouters = (url) => {
    if (routes[url]) {
        return routes[url]
    }
}

const server2 = http.createServer((request, response) => {
    let result;
    if (request.method === "GET") {
        response.setHeader("Content-type", "application/json")
        const route = findRoutes(request.url.split('?')[0])
        result = JSON.stringify(route)//stringify(то, что переделываем)- преобразуем из объекта в JSON - т.е строку
    } else {
        response.statusCode = 405;
        result = 'Method not allowed'
    }
})
server2.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})


//**********  POST - запросы*********** 

const server3 = http.createServer((request, response) => {
    let result;
    if (request.method === "GET") {
        response.setHeader("Content-type", "application/json")
        const route = findRoutes(request.url.split('?')[0])
        result = JSON.stringify(route)
    } else if (request.method === "POST") {
        request.on("data", (chunk) => {
            data += chunk
        })
        request.on("end", () => {
            console.log(JSON.parse(data));
            result = data
        })
    }
    else {
        response.statusCode = 405;
        result = 'Method not allowed'
    }
})
server3.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})


//**********  Передача файлов DONLOADS***********

const server4 = http.createServer((request, response) => {
    //если есть некий index.html и мы  хотим его загрузить на сервер
    // создаем переменную с путем:
    const filePath = path.join(process.cwd(), './index.html');// path.join- соединяет все переданные строки в путь и возвращает строку пути
    const readStream = fs.createReadStream(filePath);//Для считывания файла может применяться метод fs.createReadStream(), 
    //который считывает файл в поток, и затем с помощью метода pipe() мы можем связать считанные файлы
    // с потоком записи, то есть объектом response. (fs.createReadStream(filePath).pipe(response))
    readStream.pipe(response)
    // если нужно передать файлы, то:
    // const readStream = fs.createReadStream(filePath,{encoding:"utf-8",hightWaterMark:64})
    // readStream.on("data", (chunk)=>{response.write(chunk)})
    // readStream.on("end", ()=>{response.end})
})

server4.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})


//**********  Заливка файлов на сервер DONLOADS***********
// устанавливаем библиотеку formidable и импортируем ее.
import formidable from 'formidable'
import { fips } from 'crypto';
import path from 'path';


const server5 = http.createServer((request, response) => {
    if (request.method === 'POST') {
        const mfd = request.headers['content-type'].split(';')[0];
        if (mfd === 'multipart/form-data') { //название берется из сформированного сервером 
            const form = formidable({ multiples: true });
            form.parse(request, async (err, fields, files) => {
                for (const fileName in files) {
                    const blob = files[fileName];
                    const oldPath = blob.filepath;
                    const destPath = '.';
                    const rawData = await fsp.readFile(oldPath)
                    await fsp.writeFile(path.join(process.cwd(), destPath, 'имя файла.js'), rawData)
                }
            })
        }
    }
})

server5.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})


//**********  Масштабирование серверов***********

// есть втроенная в node библиотека cluster и os (os для уточнения кол-ва ядер процессора)
import cluster from 'cluster'
import os from 'os'
import http from 'http'
import path from 'path'
import fs from 'fs'

const numCPUs = os.cpus().length // кол-во ядер процессора
if (cluster.isPrimary) {//если главный процесс, то
    console.log(`Master ${process.pid} is running...`);
    for (let i = 1; i <= numCPUs; i++) {
        console.log(`Forking process number ${i}...`);
        cluster.fork()//ф-ция, которая запускае воркеры 
    }
} else {
    //пишем наш код с обычного сервера, который мы хотим масштабировать
    const server5 = http.createServer((request, response) => {
        if (request.method === 'POST') {
            const mfd = request.headers['content-type'].split(';')[0];
            if (mfd === 'multipart/form-data') { //название берется из сформированного сервером 
                const form = formidable({ multiples: true });
                form.parse(request, async (err, fields, files) => {
                    for (const fileName in files) {
                        const blob = files[fileName];
                        const oldPath = blob.filepath;
                        const destPath = '.';
                        const rawData = await fsp.readFile(oldPath)
                        await fsp.writeFile(path.join(process.cwd(), destPath, 'имя файла.js'), rawData)
                    }
                })
            }
        }
    })
}
//Недостаток этого способа в том , что вся работа идет на одном порту 3000. При больших многоядерных CPU может так получиться, что работает усиленно родительский процесс.

// Другой способ масштабирования: 
import cp from 'child_process'//библиотека дочерних процессов
import os from 'os'
import http from 'http'
import path from 'path'
import fs from 'fs'

const numCPUs = os.cpus().length
console.log(`Master ${process.pid} is running...`);
let i = 0;
while (i < numCPUs) {
    cp.fork(`./worker.js`, [i])
    i++;
}
//теперь можно вынести в отдельный файл или тут же написать код сервера
const host = "localhost";
const startedPort = 3000;
const shift = parseInt(process.argv[2]);
const server6 = http.createServer((req, res) => {
    console.log(`Worker ${process.pid} handle this request...`);
    const filePath = path.join(process.cwd(), './index.html');// path.join- соединяет все переданные строки в путь и возвращает строку пути
    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8', highWaterMark: 64 });
    readStream.on('data', (chunk) => {
        console.log(chunk);
        res.write(chunk)
    })
    readStream.on('end', () => {
        res.end()
    })
})
server6.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
    //теперь каждый воркер работает на своем порту, но теперь придется каждый запрос распределять и отправлять на следующий порт за уже работающем портом. 
})