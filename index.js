import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(express.static("./public"));

app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index");
});

app.get("/home", (req, res) => {
    res.render(__dirname + "/views/index");
});
app.get("/menu", (req, res) => {
    res.render(__dirname + "/views/menu");
});
app.get("/about", (req, res) => {
    res.render(__dirname + "/views/about");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  