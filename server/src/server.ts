import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.get("/", ( , res) => res.send("running"));

let port = 4000;
app.listen(port, asyne () => {
    console.log(`server running at http://localhost:${port}`);
})