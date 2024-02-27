

import express from 'express';

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs") // jsp, blade code logic in html
    app.set("views", "./src/views")
}


module.exports = configViewEngine