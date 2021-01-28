
const exec = require("child_process").execSync;

export function fact(num: number): number {
    const value = exec(`node dist/task2/factorial.js ${num}`);
    return parseInt(value);
}

const array = process.argv.slice(2, process.argv.length).map(num => parseInt(num));
for (const number of array)
    console.log(`fact(${number}) = ${fact(number)}`);