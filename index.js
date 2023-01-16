import EventEmitter from "events"



const timeParams = process.argv.slice(2).map((item) => +item); //  «час-день-месяц-год»
let [hour, day, month, year] = timeParams;
let different = new Date(year, month - 1, day, hour) - new Date();
let days = Math.floor(different / 86400000);
let hours = Math.floor(different % 86400000 / 3600000);
let min = Math.floor((different % 86400000 % 3600000) / 60000);
let sec = Math.floor((different % 86400000 % 3600000 % 60000) / 1000);
let actual = new Date();
let actualYear = actual.getFullYear();
let actualMonth = actual.getMonth();
let actualDate = actual.getDate();
let actualHour = actual.getHours();


class MyEmitter extends EventEmitter { };
const emitterObject = new MyEmitter();

const generateNewTimer = () => {
    while (
        (year !== 0 && month !== 0 && day !== 0 && hour !== 0) ||
        (actualYear <= year || actualMonth <= month || actualDate <= day || actualHour <= hour)
    ) {
        return setInterval(() => {
            console.log(`остаток: ${days} дней, ${hours} часов, ${min} минут, ${sec} секунд`);
            if (sec == 0) {
                if (min == 0) {
                    if (hours == 0) {
                        if (days == 0) {
                            console.log("Время вышло")
                            emitterObject.removeListener('newTimer')
                        } else {
                            days--;
                            hours = 24;
                        }
                    }
                    hours--;
                    min = 60;
                }
                min--;
                sec = 60;
            }
            sec--;
        }, 1000);
    }
    console.log("timer is out")
}

emitterObject.on("newTimer", generateNewTimer);

const run = async () => {
    await emitterObject.emit('newTimer');
}
run();