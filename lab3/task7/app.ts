import readlineSync from 'readline-sync';
import fs from 'fs';
import { IteratorData } from './data';

function get_line(msg: string): string {
  return readlineSync.question(msg);
}

function max_branch(obj: any, iterator: IteratorData) {
  if (typeof(obj) !== 'object') {
    if (iterator.cur_depth > iterator.max_depth) {
      iterator.max_depth = iterator.cur_depth;
      iterator.max_branch = [...iterator.cur_branch];
    }
  } else {
    iterator.cur_depth++;
    for (const field in obj) {
      iterator.cur_branch.push(field);
      max_branch(obj[field], iterator);
      iterator.cur_branch.pop();
    }
    iterator.cur_depth--;
  }
}

const filename: string = get_line("Enter filename: ");
let object: any = JSON.parse(fs.readFileSync(filename).toString());

let iterator: IteratorData = {
  cur_depth: 0,
  max_depth: 0,
  cur_branch: [],
  max_branch: []
};

max_branch(object, iterator)
console.log(iterator.max_branch);
