const fs = require("fs");
const path = require("path");

const pathFile = path.join(__dirname, "person.json");

const data = JSON.parse(fs.readFileSync(pathFile, "utf-8"));

data.age -= 10;
data.city = "Ekaterinburg";

fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));