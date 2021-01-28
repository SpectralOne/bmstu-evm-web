import { Request, Response } from "express";
import { Car } from './../../interfaces/car';

import fs from "fs";
import path from "path";

export const default_controller = (_: Request, res: Response) => res.render("index.ejs");

export const insert_record = (req: Request, res: Response) => {
    try {
        const { name, price } = req.body;
        if (!name || !price)
            throw Error("");

        insert_db({ name, price } as Car);
        res.status(200).send(JSON.stringify({ result: "OK!" }));
    } catch (_) {
        res.status(400).send(JSON.stringify({ result: "Failed!" }));
    }
}

export const select_record = (req: Request, res: Response) => {
    const car: Car | undefined = get_db(req.query.name as string);
    if (car)
        res.status(200).send(JSON.stringify({ result: "OK!", car }))
    else
        res.status(400).send(JSON.stringify({ result: `No such car ${req.query.name}!` }));
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

let db: Car[] = JSON.parse(fs.readFileSync(DB_FILE).toString());

console.log(db);

function get_db(name: string): Car | undefined {
    return db.find((car) => car.name === name);
}

function insert_db(car: Car) {
    db.push(car);
    fs.writeFileSync(DB_FILE, JSON.stringify(db));
}