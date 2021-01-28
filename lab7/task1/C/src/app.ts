import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { 
    render_create_car, 
    create_car, 
    search_car, 
    show_car, 
    render_create_storage, 
    create_storage, 
    search_storage, 
    show_storage, 
    default_controller 
} from "./controller";

const app = express();

const VIEWS_FOLDER = path.join(__dirname, "..", "..", "..", "..", "task1", "C", "views");
const PUBLIC_FOLDER = path.join(__dirname, "..", "..", "..", "..", "task1", "C", "public");

app.set("view engine", "ejs");
app.set("views", VIEWS_FOLDER)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(PUBLIC_FOLDER))

app.get("/", default_controller);

app.get("/create-car", render_create_car);
app.post("/create-car", create_car);

app.get("/search-car", search_car);
app.get("/car", show_car);

app.get("/create-storage", render_create_storage);
app.post("/create-storage", create_storage);

app.get("/search-storage", search_storage);
app.get("/storage", show_storage);

app.post("/create-car", create_car);


app.listen(3000)
console.log("Running on port 3000");
