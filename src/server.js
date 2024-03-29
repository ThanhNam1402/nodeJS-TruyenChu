import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./router/web";
import connectDB from "./config/connectDB"
import cors from "cors";
import cookieParser from "cookie-parser"
import 'dotenv/config'
import { corsOptions } from "./config/cors";

import { routerAdmin } from "./router/routerAdmin";
import { routerCreater } from "./router/routerCreater";
import { routerClient } from "./router/routerClient";


const app = express();

// xu ly cors 
app.use(cors(corsOptions));
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);


app.use('/admin', routerAdmin)
app.use('/', routerClient, routerCreater);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("backend " + port);
});