# Цель

Изучить `ajax` запросы и `query`. Получить навыки работы с `css`.

# Задания

### Задание 1

Создать сервер.
Сервер должен выдавать страницу с тремя текстовыми полями и кнопкой.
В поля ввода вбивается информация о почте, фамилии и номере телефона человека.
При нажатии на кнопку *"Отправить"* введённая информация должна отправляться с помощью **POST** запроса на сервер и добавляться к концу файла (в файле накапливается информация).
При этом **на стороне сервера** должна происходить проверка: являются ли почта и телефон уникальными. Если они уникальны, то идёт добавление информации в файл. В противном случае добавление не происходит. 
При отправке ответа с сервера клиенту должно приходить сообщение с информацией о результате добавления (добавилось или не добавилось).
Результат операции должен отображаться на странице.

### Задание 2

Добавить серверу возможность отправлять клиенту ещё одну страницу. На данной странице должно быть поле ввода и кнопка. В поле ввода вводится почта человека. При нажатии на кнопку *"Отправить"* на сервер отправляется **GET** запрос. Сервер в ответ на **GET** запрос должен отправить информацию о человеке с данной почтой в формате **JSON** или сообщение об отсутствии человека с данной почтой.

### Задание 3

Оформить внешний вид созданных страниц с помощью **CSS**.
Информация со стилями **CSS** для каждой страницы должна храниться в отдельном файле. Стили **CSS** должны быть подключены к страницам.

### Код

Интерфейс пользователя

```typescript
export interface User {
    email: string,
    surname: string,
    phone: string
}
```

Сервер

```typescript
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { set_headers, second_page, add_user, find_user, default_controller } from "./controller";

const app = express();

app.use(set_headers)
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/second-page", second_page)
app.get("/", default_controller);
app.get("/search", find_user)
app.post("/user", add_user);

app.listen(3000)
console.log("Running on port 3000");
```

Контроллер сервера

```typescript
import { Request, Response, NextFunction } from "express";
import { User } from './user';

import path from "path";
import fs from "fs";

const SECOND_PAGE: string = path.join(__dirname, "..", "public", "second.html");
const MAIN_PAGE: string = path.join(__dirname, '..', "public", "index.html");
const FILE: string = path.join(__dirname, "..", "db", "db.txt");

export const default_controller = (_: Request, res: Response) => res.sendFile(MAIN_PAGE);

export const second_page = (_: Request, res: Response) => {
    res.sendFile(SECOND_PAGE);
}

export const set_headers = (_: Request, res: Response, next: NextFunction) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

export const add_user = (req: Request, res: Response) => {
    let user: User = req.body;
    const users = get_all_db();

    const target = users.find((value: User) => value.email == user.email && value.phone == user.phone);
    let code: number = 200;
    let result: string = "Added!";

    if (!target) {
        add_db(user as User);
    } else {
        code = 401;
        result = "Found!"
        user = target;
    }

    res.status(code).send(JSON.stringify({
        result,
        ...user
    }));
};

export const find_user = (req: Request, res: Response) => {
    const target: User | undefined = find_user_db(req.query.email as string);
    console.log(req.query);

    if (target) {
        res.status(200).send(JSON.stringify({
            result: "User found!",
            ...target
        }));
    } else {
        res.status(404).send(JSON.stringify({
            result: "User not found!"
        }));
    }
}

export const get_all_db = (): User[] => {
    return JSON.parse(fs.readFileSync(FILE).toString());
}

export const add_db = (user: User) => {
    const users: User[] = get_all_db();
    users.push(user);
    fs.writeFileSync(FILE, JSON.stringify(users));
}

const find_user_db = (email: string): User | undefined => {
    const users: User[] = get_all_db();
    return users.find((user: User) => user.email === email);
}
```

Пример встраиваемого в страницу скрипта

```js
"use strict";

const post = async (url, body) => {
    return fetch(
        url, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body
    }).then(response => response.json())
}

const convert_result = (result) => {
    let content = "";
    for (const field in result) {
        content += `${field}: ${result[field]}\r\n`;
    }

    return content;
}

const send_data = () => {
    let email = document.querySelector("#email");
    let lastname = document.querySelector("#lastname");
    let phone = document.querySelector("#phone");
    const label = document.querySelector("#result");

    if (email && lastname && phone && label) {
        email = email.value;
        lastname = lastname.value;
        phone = phone.value;

        const body_string = JSON.stringify({ email, lastname, phone });
        post("/user", body_string)
            .then(result => {
                label.textContent = convert_result(result);
            });
    } else {
        alert("Error");
    }

}

const button = document.querySelector("button");
button.addEventListener('click', send_data);
```

Подключение скрипта

```html
<head>
    <script defer src="assets/scripts/second.js"></script>
</head>
```

Пример `css`

```css
header {
    text-align: center;
    font-size: 2em;
    margin-bottom: 3em;
}

html {
    margin: 0;
    padding: 0;
}

body {
    padding-top: 2em !important;
    margin: 0;
    padding: 0;
    background-color: #000000;
    color: white !important;
}

label {
    font-size: 1.5em;
    font-weight: bold;
}

input {
    justify-self: center;
    background-color: white;
    color: #060818;
    padding: 1em;
    font-size: 1em;
    margin-bottom: 0.3em;
}

button {
    cursor: pointer;
    background: honeydew;
    border-radius: 0.5em;
    padding: 1em 4em;
    margin-top: 0.1em;
}

h1 {
    margin-top: 2em;
    margin-bottom: 2em;
    text-align: center;
    color: honeydew;
}

form {
    text-align: center;
    margin-top: 1em;
}

ul {
  padding: 0;
  width: 100%;
  text-align: center;
  list-style: inside;
}

li {
  display: inline;
}

p.t1 {
    font-size: 2em;
}

a.home-url, a.home-url:link, a.home-url:visited, a.home-url:focus, a.home-url:hover, a.home-url:active {
    background-color: black;
    color: honeydew;
    text-align: center;
    width: 10%;
    display: inline-block;
}

a {
  outline: none;
  text-decoration: none;
  display: inline-block;
  width: 19.5%;
  margin-right: 0.625%;
  text-align: center;
  line-height: 3;
  color: black;
}

li:last-child a {
  margin-right: 0;
}

a:link, a:visited, a:focus {
  background: yellow;
}

a:hover {     
  background: orange;
}

a:active {
  background: red;
  color: white;
}

```

# Вывод

Научился работать с `ajax` и `query`, получил навыки вёрстки страницы с помощью `css`.