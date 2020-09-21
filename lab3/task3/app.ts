import readlineSync from 'readline-sync';
import fs from 'fs';

function get_line(msg: string): string {
  return readlineSync.question(msg);
}

function get_files(path: string, ext: string): string[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path);
  } catch (error) {
    console.log(error)
  }
  return files.filter((fname) => fname.toLowerCase().endsWith(ext));
}

function get_file_content(fname: string): string {
  return fs.readFileSync(fname).toString();
}

let ext: string = get_line("Enter file ext: ");
if (!ext.startsWith(".")) {
  ext = "." + ext;
}
const input_path: string = get_line("Enter path: ");
const files: string[] = get_files(input_path, ext);
for (const file of files) {
  console.log(`file: ${file}\ncontent:\n${get_file_content(file)}\n`);
}
