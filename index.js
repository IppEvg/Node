import EventEmitter from "events"
import { getEnvironmentData } from "worker_threads";


const timeParams = process.argv.slice(2).map((item) => +item); //  «час-день-месяц-год»
let [hour, day, month, year] = timeParams;
let different =  new Date(year, month-1, day, hour)-new Date();
let days = Math.floor(different / 86400000);
let hours = Math.floor(different % 86400000 /3600000);
let min = Math.floor((different% 86400000 %3600000) / 60000);
let sec = Math.floor((different% 86400000 %3600000 % 60000)/1000);
let actual= new Date();
let actualYear = actual.getFullYear();
let actualMonth =actual.getMonth();
let actualDate =actual.getDate();
let actualHour = actual.getHours();


class MyEmitter extends EventEmitter { };
const emitterObject = new MyEmitter();

// class Timer {
//     constructor(params){
//         this.
//     }
// }

const generateNewTimer = () => {
    while (
        (year !== 0 && month!==0&&  day!==0 && hour!==0)||
        (actualYear <= year || actualMonth <= month || actualDate <= day || actualHour <= hour)
        ) {
        return setInterval(() => { console.log(`остаток: ${days} дней,${hours} часов,${min} минут, ${sec} секунд`);
        if (sec<= 0){
            min--;
            sec=60;
            if(min<=0){
                hours--;
                min = 60;
                if(hours<=0){
                    days--;
                    hours=24;
                    if(days<=0){
                        console.log("timer is out")
                        clearInterval(); 
                    }
                }
        
            }
        }
        sec--;
        },1000);
        //     return setInterval(() => { console.log(`остаток: ${days} дней,${hours} часов,${min} минут, ${sec} секунд`);
        //     sec--;
        // }, 1000);
    }
    console.log("timer is out")

}
emitterObject.on("newTimer", generateNewTimer);

const run = async () => {
    generateNewTimer();
//    await emitterObject.emit();
    // emitterObject.emit(customer.type, customer.payload);
    }
    run();
    
//     const intervalValue = generateIntRange(1, 5) * 1000
//     const params = requestTypes[generateIntRange(0, requestTypes.length - 1)]

//     return delay(intervalValue).then(() => new Customer(params))
// }

// generateNewTimer().then(
//     customer => emitterObject.emit(customer.type, customer.payload)
//     );
    




































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


