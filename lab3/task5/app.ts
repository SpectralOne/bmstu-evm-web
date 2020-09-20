import readlineSync from 'readline-sync';
import fs from 'fs';

function get_line(msg: string): string {
  return readlineSync.question(msg);
}

function get_file_list(N: number): string[] {
  let list: string[] = [];
  for (let i = 0; i < N; i++) {
    const element: string = get_line(`${i + 1}/${N} -> `);
    list.push(element);
  }

  return list.filter((file) => fs.existsSync(file));
}

function dump(fname: string, obj: string): void {
  fs.writeFileSync(fname, obj);
}

function form_string(files: string[]): string {
  let result: string = "";
  for (const file of files) {
    result += fs.readFileSync(file);
  }

  return result;
}

const N: number = parseInt(get_line("Input number: "));

if (!N || N < 1) {
  console.log("Invalid input!");
} else {
  let file_list: string[] = get_file_list(N);
  dump("task5.txt", form_string(file_list))
}