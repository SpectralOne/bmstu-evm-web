import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { set_headers, second_page, add_user, find_user, default_controller } from "./controller";

const app = express();

app.use(set_headers)
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/second", second_page)
app.get("/", default_controller);
app.get("/search", find_user)
app.post("/user", add_user);

app.listen(3000)
console.log("Running on port 3000");
