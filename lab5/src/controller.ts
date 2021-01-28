import { Request, Response, NextFunction } from "express";
import { User } from './user';

import path from "path";
import fs from "fs";

const SECOND: string = path.join(__dirname, "..", "public", "second.html");
const HOME: string = path.join(__dirname, '..', "public", "index.html");
const DB: string = path.join(__dirname, "db.txt");

export const default_controller = (_: Request, res: Response) => res.sendFile(HOME);

export const second_page = (_: Request, res: Response) => {
    res.sendFile(SECOND);
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
    return JSON.parse(fs.readFileSync(DB).toString());
}

export const add_db = (user: User) => {
    const users: User[] = get_all_db();
    users.push(user);
    fs.writeFileSync(DB, JSON.stringify(users));
}

const find_user_db = (email: string): User | undefined => {
    const users: User[] = get_all_db();
    return users.find((user: User) => user.email === email);
}