
import readline from "readline";
import fsp from "fs/promises";
// import fs from "fs";
import path from "path";
import inquirer from "inquirer";



const rl = readline.createInterface( //создаем интерфейс
    {
        input: process.stdin,
        output: process.stdout
    }
);
const root = process.cwd(); //  текущий рабочий каталог процесса Node.js.
const findFilesInDir = (dirName) => {
    return fsp    // Операция на основе промисов возвратит промис, который выполняется после завершения асинхронной операции
        .readdir(dirName) // читаем директорию асинхронно
        .then((choices) => { // создаем интерактив в виде столбца с директориями и файлами с помощью inquirer.prompt
            return inquirer.prompt([
                {
                    name: 'fileName',       // первый запрос- список файлов и папок
                    type: 'list',
                    message: 'выберите файл',
                    choices, // выбор , который сделает user
                },
                {
                    name: 'findOfWorld', // запрос на поиск строки
                    type: 'input',
                    message: 'Что ищем?',
                },
            ])
        })
        .then(async ({ fileName, findOfWorld }) => { // обработка запросов по файлу и слова, который хотим найти
            const fullPath = path.join(dirName, fileName);// соединяем путь до нашей папки и имя выбранного файла
            const stat = await fsp.stat(fullPath);// для получения сведений, чтобы узнать файл ли это.
            if (!stat.isFile) { // если не файл, то переходим дальше, снова использую ф-цию findFileInDir
                return findFilesInDir(fullPath)
            }
            return Promise.all([  // возвращаем промис после всех выполненных промисов 
                fsp.readFile(path.join(dirName, fileName), 'utf-8'), // читаем выбранный файл, если он является файлом
                Promise.resolve(findOfWorld),// 
            ]);
        })
        .then((result) => {
            if (result) {
                const [text, findOfWorld] = result;
                const pattern = new RegExp(findOfWorld, 'g'); // регулярное выражение равное нашему слову, искомое глобально - флаг g
                let count = 0;
                const out = text.replace(pattern, () => { //считаем сколько раз встречается строка
                    count++;
                });
                console.log(`${count} раз встречается слово`);// выводим кол-во совпадений
                rl.close(); // команда обработчику о выходе из скрипта.
            }
        })
}




rl.question(`/n введи директорию: `, // задаем вопрос для уточнения директории. - Начало работы скрипта
    (dirPath) => {   // колбек вернет действие на наш заброс, который в аргументе
        const dirName = path.join(root, dirPath);// соединяем рабочий каталог процесса Node.js и путь выбранной папки. 
        findFilesInDir(dirName) // запускаем функцию с полученным путем.
    }
);

rl.on('close', () => process.exit(0));// задаем обработчик для выхода из программы с кодом 0 - без проблем, без ошибок




