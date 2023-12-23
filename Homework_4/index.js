const express = require("express");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const pathFile = path.join(__dirname, "data.json");

const userSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    age: Joi.number().min(0).required(),
    city: Joi.string().min(2),
})


const app = express();
app.use(express.json());

let uId = 0;


app.get("/users", (req, res) => {
    data = readFile();
    res.send(data);
});

app.get("/users/:id", (req, res) => {
    data = readFile();
    const user = data.find((user) => user.id === +req.params.id);
    if (user) {
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});

app.post("/users", (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(500).send({error: result.error.details});
    }
    uId += 1;
    data = readFile();
    data.push({
        id: uId,
        ...req.body,
    })
    updateFile(data);
    res.send({id: uId})
});

app.put("/users/:id", (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(500).send({error: result.error.details});
    }
    data = readFile();
    const user = data.find((user) => user.id === +req.params.id);
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;
        updateFile(data);
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});

app.delete("/users/:id", (req, res) => {
    data = readFile();
    const user = data.find((user) => user.id === +req.params.id);
    if (user) {
        const userIndex = data.indexOf(user);
        data.splice(userIndex, 1);
        updateFile(data);
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});

function readFile() {
    const data = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
    return data;
}

function updateFile(data) {
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));
}

const port = 3000;
app.listen(port,() => console.log("Сервер запущен"));