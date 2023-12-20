const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();


app.get("/", (req, res) => {
    textContent = `
        <h1>Main</h1>
        <a href='/about'>About</a>
        <p>Просмотров: ${updateCounter("/")}</p>`
    res.send(textContent) });


app.get("/about", (req, res) => {
    textContent = `
        <h1>About</h1>
        <a href='/'>Main</a>
        <p>Просмотров: ${updateCounter("/about")}</p>`
    res.send(textContent) });


function updateCounter(url) {
    const pathFile = path.join(__dirname, "counter.json");
    const data = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
    data[url]++;
    const counter = data[url];
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));
    return counter;
}


const port = 3000;
app.listen(port,() => console.log("Сервер запущен"));