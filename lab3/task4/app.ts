import fs from 'fs';
import path from 'path';

function check(fname: string): boolean {
  return fname.endsWith(".txt") && fs.readFileSync(fname).length <= 10;
}

function recursive_walk(dir: string, arr: string[]): void {
  if (check(dir)) {
    arr.push(dir);
  } else if (fs.lstatSync(dir).isDirectory()) {
    const files: string[] = fs.readdirSync(dir);
    for (const file of files) {
      recursive_walk(path.join(dir, file), arr);
    }
  }
}

let arr: string[] = [];
recursive_walk("./", arr);
console.log(arr);