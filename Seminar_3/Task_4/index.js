const express = require("express");

const port = 3000;
const app = express();
const middleware = express.static("static");

app.use(middleware);

app.listen(port,() => console.log("Сервер запущен"));