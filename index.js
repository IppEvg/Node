import colors from "colors"

const args = process.argv.slice(2);
let arr = []

if (isNaN(args[0]) || isNaN(args[1])) {
    console.log("Ошибка! Вы ввели не числа".red)
} else {
    for (let i = +args[0]; i <= +args[1]; i++) {
        let trigger = false;
        if (i == 1 || i == 2) {
            trigger = true;
        }
        for (let j = 2; j < i; j++) {
            if (i % j == 0) { break }
            else if (j == (i - 1) || i % j == 0) {
                trigger = true
            }
        }
        if (trigger) {
            switch (arr.length % 3) {
                case 0:
                    arr.push(colors.green(i));
                    break
                case 1:
                    arr.push(colors.yellow(i));
                    break
                case 2:
                    arr.push(colors.red(i));
                    break
            }
            trigger = false
        }
    }
    if (arr.length > 0) {
        console.log(arr.join('\n'));
    } else {
        console.log("В данном диапазоне простых чисел нет".red);
    }


}



// const primeNumbers = () => {
//     const arr = Array.from({ length: (+args[1]) - (+args[0]) + 1 }, (v, i) => i + 1)
//
// }

// Array(10).fill().map((e, i) => i + 1)
