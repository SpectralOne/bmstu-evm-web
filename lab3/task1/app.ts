import readlineSync from 'readline-sync';
import fs from 'fs';

const arr: string[] = [];

function get_line(msg: string): string {
  return readlineSync.question(msg);
}

function dump(fname: string, obj: any): void {
  fs.writeFileSync(fname, JSON.stringify(obj, null, 2));
}

const N: number = parseInt(get_line("Input number: "));

if (!N || N < 1) {
  console.log("Invalid input!");
} else {
  for (let i = 0; i < N; i++) {
    const element: string = get_line(`${i + 1}/${N} -> `);
    if (!(element.length % 2)) {
      arr.push(element);
    }
  }
  dump("task1.txt", arr);
}
