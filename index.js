import EventEmitter from "events"


const timeParams = process.argv.slice(2).map((item) => +item); //  «час-день-месяц-год»
let [hour, day, month, year] = timeParams;

let actualYear = new Date().getFullYear();
let actualMonth = new Date().getMonth();
let actualDate = new Date().getDate();
let actualHour = new Date().getHours();
// 
let days = new Date() - new Date(year, month, day, hour) / 86400000;
let hours = new Date() - new Date(year, month, day, hour) % 86400000 3600000;
let min = new Date() - new Date(year, month, day, hour) % 60000;
let sec = new Date() - new Date(year, month, day, hour) % 1000;
console.log(`остаток: ${days} дней, часов,минут, секунд`)
class MyEmitter extends EventEmitter { };
const emitterObject = new MyEmitter();



const generateNewTimer = () => {
    if (actualYear <= year || actualMonth <= month || actualDate <= day || actualHour <= hour) {
        return setInterval(() => { console.log(new Date() - new Date(year, month, day, hour)) }, 2000);
    }
}
emitterObject.on('generateNewTimer', generateNewTimer);
//     const intervalValue = generateIntRange(1, 5) * 1000
//     const params = requestTypes[generateIntRange(0, requestTypes.length - 1)]

//     return delay(intervalValue).then(() => new Customer(params))
// }






































// import colors from "colors"

// const args = process.argv.slice(2);
// let arr = []

// if (isNaN(args[0]) || isNaN(args[1])) {
//     console.log("Ошибка! Вы ввели не числа".red)
// } else {
//     for (let i = +args[0]; i <= +args[1]; i++) {
//         let trigger = false;
//         if (i == 1 || i == 2) {
//             trigger = true;
//         }
//         for (let j = 2; j < i; j++) {
//             if (i % j == 0) { break }
//             else if (j == (i - 1) || i % j == 0) {
//                 trigger = true
//             }
//         }
//         if (trigger) {
//             switch (arr.length % 3) {
//                 case 0:
//                     arr.push(colors.green(i));
//                     break
//                 case 1:
//                     arr.push(colors.yellow(i));
//                     break
//                 case 2:
//                     arr.push(colors.red(i));
//                     break
//             }
//             trigger = false
//         }
//     }
//     if (arr.length > 0) {
//         console.log(arr.join('\n'));
//     } else {
//         console.log("В данном диапазоне простых чисел нет".red);
//     }


