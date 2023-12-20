const express = require("express");

const port = 3000;

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Main</h1><a href='/about'>About</a>") });

app.get("/about", (req, res) => {
    res.send("<h1>About</h1><a href='/'>Main</a>") });


app.listen(port,() => console.log("Сервер запущен"));