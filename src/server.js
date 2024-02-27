import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./router/web";
import connectDB from "./config/connectDB"
import cors from "cors";

import { corsOptions } from "./config/cors";

require('dotenv').config();


import { createTokenJWT, verify } from './middelware/jwt';


const app = express();

// xu ly cors 
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createTokenJWT();

let dedcoded = verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtY3V0ZSIsImVtYWlsIjoibmFtY3V0ZTEyQGdtYWlsLmNvbSIsImlhdCI6MTcwNDM4MzQ3MX0.yFUzYmYeay1kbRABXaKpBWxkU8FrSQarfBwrAey9wz4")
console.log('decoded : ', dedcoded);
viewEngine(app);
initWebRouters(app);

connectDB();


let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("backend " + port);
});