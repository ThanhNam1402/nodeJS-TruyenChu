import express from "express";

import { routerAdmin } from "./routerAdmin";
import { routerClient } from "./routerClient";
import { routerCreater } from "./routerCreater";
import { checkTokenJWT } from "../middelware/jwt";

let router = express.Router();



let initWebRouters = (app) => {

    router.all('*', checkTokenJWT)

    app.use('/admin', routerAdmin)
    app.use('/', routerClient, routerCreater);
    return app.use("/", router);
}


module.exports = initWebRouters;