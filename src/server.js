import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB"
import cors from "cors";
import cookieParser from "cookie-parser"
import 'dotenv/config'
import { corsOptions } from "./config/cors";

import { routerCreator } from "./router/routerCreator/index";
import { routerClient } from "./router/routerClient";


const app = express();

// xu ly cors 
app.use(cors(corsOptions));
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

app.use('/api', routerClient, routerCreator);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("backend " + port);
});