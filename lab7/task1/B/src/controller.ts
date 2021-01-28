import { Request, Response, NextFunction } from "express";
import { Storage } from './../../interfaces/storage';

import fs from "fs";
import path from "path";

export const insert_record = (req: Request, res: Response) => {
    try {
        const { name, cars } = req.body;
        if (!name || !cars)
            throw Error("");
        insert_db({ name, cars } as Storage);

        res.status(200).send(JSON.stringify({ result: "OK!" }));
    } catch (_) {
        res.status(400).send(JSON.stringify({ result: "Failed!" }));
    }
}

export const select_record = (req: Request, res: Response) => {
    const storage: Storage | undefined = get_db(req.query.name as string);
    if (storage)
        res.status(200).send(JSON.stringify({ result: "OK!", storage }))
    else
        res.status(400).send(JSON.stringify({ result: `No such storage ${req.query.name}!` }));
}

export const bad_request_controller = (req: Request, res: Response) => {
    res.status(400).send(JSON.stringify({ result: `Unknown request: ${req.method} ${req.url}` }));
}

const DB_FILE_FOLDER = path.join(__dirname, "..", "db");
const DB_FILE = path.join(DB_FILE_FOLDER, "db.txt");

if (!fs.existsSync(DB_FILE_FOLDER))
    fs.mkdirSync(DB_FILE_FOLDER);

if (!fs.existsSync(DB_FILE))
    fs.writeFileSync(DB_FILE, JSON.stringify([]));

let db: Storage[] = JSON.parse(fs.readFileSync(DB_FILE).toString());

function get_db(name: string): Storage | undefined {
    return db.find(storage => storage.name === name);
}

function insert_db(storage: Storage) {
    db.push(storage);
    fs.writeFileSync(DB_FILE, JSON.stringify(db));
}