
export function fact(num: number): number {
    let res = 1;

    for (let i = 2; i <= num; i++)
        res *= i;

    return res;
}

console.log(fact(parseInt(process.argv[2])));