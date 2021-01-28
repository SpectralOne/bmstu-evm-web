import express from "express";
import bodyParser from "body-parser";
import { bad_request_controller, insert_record, select_record } from "./controller";

const app = express();

app.use(bodyParser.json());

app.post("/insert/record", insert_record);
app.get("/select/record", select_record);
app.use(bad_request_controller);

app.listen(4002);
console.log("Running on port 4002");
