const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const db = require("./db/db.json");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function (req, res) {
    res.json(db)
});

app.post("/api/notes", function (req, res) {
    db.push(req.body)
    req.body.id = db.length;
    res.json(db)
});

app.delete("/api/notes/:id", function (req, res) {
    for (let i = 0; i < db.length; i++) {
        if (db[i].id === parseInt(req.params.id)) {
            db.splice((i), 1)
        }
    }
    res.json(db)
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.listen(PORT, function () {
    console.log(`App is currently listening on Port: ${PORT}`)
})