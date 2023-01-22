#!/C:\Program Files\nodejs
import fs from "fs";
import path from "path";
import inquirer from "inquirer";

const __dirname=process.cwd()
const isFile = fileName => {
return fs.lstatSync(fileName).isFile();
}
const list = fs.readdirSync(__dirname).filter(isFile);
inquirer
.prompt([{
name: "fileName",
type: "list",
message: "Choose file:",
choices: list,
}])
.then((answer) => {
console.log(answer.fileName);
const filePath = path.join(__dirname, answer.fileName);
fs.readFile(filePath,'utf8', (err, data) => {
console.log(data);
});
});