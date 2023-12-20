const fs = require("fs");
const path = require("path");

const pathFile = path.join(__dirname, "person.json");

const person = {
name: "Ivan",
surname: "Ivanov",
age: 30,
city: "Moscow"
}

fs.writeFileSync(pathFile, JSON.stringify(person, null, 2));