import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { set_headers, games, personal, login, exit, default_controller } from "./controller";

declare global {
    namespace Express {
        export interface Request {
            error?: string
        }
    }
}

const app = express();

app.use(set_headers)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"))

app.use(cookieSession({
    name: 'session',
    keys: ['a', 'b', 'c'],
    maxAge: 60 * 1000
}));
app.get("/games", games)
app.get("/", default_controller)
app.get("/personal", personal)
app.get("/exit", exit)
app.post("/login", login)


app.listen(3000)
console.log("Running on port 3000");
