import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./router/web";
import connectDB from "./config/connectDB"
import cors from "cors";
import { corsOptions } from "./config/cors";

import cookieParser from "cookie-parser"

require('dotenv').config();

const app = express();

app.use(cookieParser())



// xu ly cors 
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("backend " + port);
});