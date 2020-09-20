import fs from 'fs';

function read_file(fname: string): string[] {
  let arr: string[] = [];
  try {
    const rawdata = fs.readFileSync(fname);
    arr = JSON.parse(rawdata.toString());
  } catch (error) {
    console.log(error);
  }

  return arr;
}

function contain_vowels(s: string): boolean {
  const match = s.match(/[aeiou]/gi);
  return match === null ? false : true;
}

function process(arr: string[]): string[] {
  return arr.filter((instance) => contain_vowels(instance.toLowerCase()) === false);
}

const arr: string[] = read_file("task1.txt");
if (arr.length !== 0) {
  console.log(process(arr));
} else {
  console.log("Error occured. Information above ^^^");
}
