# Цель

Продолжить изучение **TS**, изучить написание клиент-серверного приложения с помощью **ClojureScript**

# Задания

## Task 3

### Задание 1

С клавиатуры считывается число N.
Далее считывается N строк.
Необходимо создать массив и сохранять в него строки только с четной длинной.
Получившийся массив необходимо преобразовать в строку JSON и сохранить в файл.

### Код

```typescript
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

```

### Задание 2

Необходимо считать содержимое файла, в котором хранится массив строк в формате JSON.
Нужно вывести только те строки на экран, в которых содержатся только гласные буквы.

### Код

```typescript
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

```

### Задание 3

С клавиатуры считывается строка - название расширения файлов.
Далее считывается строка - адрес папки.
Необходимо перебрать все файлы в папке и вывести содержимое файлов, у которых расширение совпадает с введенным расширением.

### Код

```typescript
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

```

### Задание 4

Дана вложенная структура файлов и папок.
Все файлы имеют раширение "txt".
Необходимо рекурсивно перебрать вложенную структуру и вывести имена файлов, у которых содержимое не превышает по длине 10 символов.

### Код

```typescript
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
```

### Задание 5

С клавиатуры считывается число N. 
Далее считывается N строк - имена текстовых файлов.
Необходимо склеить всё содержимое введенных файлов в одну большую строку и сохранить в новый файл.

### Код

```typescript
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
```

### Задание 6

Написать код, который позволяет определить максимальный возможный уровень вложенности друг в друга полей в объекте, чтобы данный объект можно было преобразовать в строку формата JSON. Ответом является целое число.

### Код

```typescript
function assign(obj: any, keyPath: string[], value: any): void {
  let lastKeyIndex: number = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; i++) {
    let key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = {}
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
}

function gen_keypath(n: number): string[] {
  let res: string[] = [];
  for (let index = 0; index < n; index++) {
    res.push(index.toString())    
  }
  return res;
}

function test_depth(): void {
  let obj: any = {};
  let cnt: number = 0;

  try {
    while (JSON.stringify(obj)) {
      cnt++;
      assign(obj, gen_keypath(cnt), {})
      console.log(cnt);
    }
  } catch (error) {
    console.log(error);
  }
  console.log(`Res: ${cnt}`);
}

test_depth();

```

### Задание 7

Из файла считывается строка в формате JSON.
В этой строке информация об объекте, в котором находится большое количество вложенных друг в друга полей. Объект представляет из себя дерево. Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве. Необходимо вывести на экран ветку с максимальной вложенностью.

### Код

```typescript
export interface IteratorData {
    cur_depth: number,
    max_depth: number,
    cur_branch: string[],
    max_branch: string[]
}

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

```

## Task 2

# Задания

### Задание 1

Запустить сервер. 
Реализовать на сервере функцию для сравнения трёх чисел и выдачи наибольшего из них.
Реализовать страницу с формой ввода для отправки запроса на сервер.

### Код сервера
```clj
(ns server.core
  (:require
   [reagent.core :as reagent]
   [server.router :as router]
   [server.events]
   [server.subs]
   [server.views]))

(defn ^:export init
  []
  (router/start!)
  (reagent/render [server.views/server-app]
    (.getElementById js/document "app")))

```

### Код задания

```clojure
(defn get-max [data]
  ((key (apply max-key val data)) data))

(reg-event-fx
 :task1
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:result] (get-max vals))
    :dispatch [:set-active-page {:page :result}]}))
```

### Задание 2

Запустить сервер. 
На стороне сервера должен храниться файл, внутри которого находится JSON строка.
В этой JSON строке хранится информация о массиве объектов.
Реализовать на сервере функцию, которая принимает индекс и выдает содержимое ячейки массива по данному индексу.
Реализовать страницу с формой ввода для отправки запроса на сервер.

```clojure
(defn get-by-idx [idx]
 (let [parsed (js->clj
               (.parse js/JSON server.db/json))]
   (parsed (read-string (:idx idx)))))

(reg-event-fx
 :task2
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:result] (get-by-idx vals))
    :dispatch [:set-active-page {:page :result}]}))
```

### Задание 3

Написать программу, которая на вход получает массив названий полей и адрес запроса (куда отправлять).
Программа должна генерировать HTML разметку страницы, в которую встроена форма для отправки запроса.

```clojure
(defn form-header [address]
  (str "<form method=\"POST\" action=\"" address "\">"))

(defn label [field]
  (str "<input type= \"text\" placeholder=\"" field "\" name= \"" field "\" > <br>"))

(defn form-body [fields]
  (let [fields    (apply str (map #(str (label %)) fields))
        submit    "<input type= \"submit\" >"
        close-tag "</form>"]
    (str fields submit close-tag)))

(defn gen-html [fields address]
  (let [caption (str "<h1>Address = "address"</h1>")
        header  (form-header address)
        body    (form-body fields)]
    (str caption header body)))

(defn parse-input [vals]
  (let [fields  (split (:fields vals) " ")
        address-tmp (:address vals)
        address     (if-not (= (first address-tmp) "/")
                      (str "/" address-tmp)
                      address-tmp)]
    (gen-html fields address)))

(reg-event-fx
 :task3
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:form] (parse-input vals))
    :dispatch [:set-active-page {:page :form}]}))
```

### Задание 4

Запустить сервер. 
Реализовать на сервере функцию, которая принимает на вход числа A, B и C.
Функция должна выдавать массив целых чисел на отрезке от A до B, которые делятся на C нацело.

```clojure
(defn range-mod [vals]
  (let [a (read-string (:a vals))
        b (read-string (:b vals))
        c (read-string (:c vals))]
    (filter #(= (mod % c) 0) (range a (+ b 1) 1))))

(reg-event-fx
 :task4
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:result] (range-mod vals))
    :dispatch [:set-active-page {:page :result}]}))
```

# Вывод

Изучил **TS**, научился писать клиент-серверные приложения на  **ClojureScript**