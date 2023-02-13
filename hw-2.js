import EventEmitter from "events"

class MyEmitter extends EventEmitter { };
const emitterObject = new MyEmitter();

const generateNewTimer = (different, days, hours, min, sec) => {
    if (
        (different >= 0)
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
    } else {
        console.log("Время вышло")
    }
}

// emitterObject.on("newTimer", generateNewTimer);

const run = (different, days, hours, min, sec) => {
    emitterObject.emit('newTimer', generateNewTimer(different, days, hours, min, sec));
}
//  «час-день-месяц-год»
for (let timeParams of process.argv.slice(2)) {
    let [hour, day, month, year] = timeParams.split('-')
    let different = new Date(year, month - 1, day, hour) - new Date();
    let days = Math.floor(different / 86400000);
    let hours = Math.floor(different % 86400000 / 3600000);
    let min = Math.floor((different % 86400000 % 3600000) / 60000);
    let sec = Math.floor((different % 86400000 % 3600000 % 60000) / 1000);

    run(different, days, hours, min, sec)
}


