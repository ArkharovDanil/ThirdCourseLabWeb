const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mysql2 = require("mysql2");

const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '31415926',
    database: 'tracks'
});


let tracksWithDifferentGenres,
    tracksWithDifferentArtists;

db.query("SELECT DISTINCT genre FROM tracks", function (err, data) {
    if (err) return console.log(err);
    tracksWithDifferentGenres = data;
});

db.query("SELECT DISTINCT artist FROM tracks", function (err, data) {
    if (err) return console.log(err);
    tracksWithDifferentArtists = data;
});

app.use(cors());
app.use("/music", express.static(path.join(__dirname, "music")));
app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', require('./routes/upload.route'));


app.get('/api/get', (req, res) => {
    let genre = req.query.genre,
        artist = req.query.artist;

    if (genre || artist) {
        let val = genre || artist;
        let field;
        if (genre) field = "genre";
        else field = "artist";
        const sqlSelect = `SELECT * FROM tracks WHERE REPLACE(${field}, " ", "")="${val}"`;
        db.query(sqlSelect, function (err, result) {
            if (err) console.log(err);
            else res.send(result)
        });
    }

    else {
        const sqlSelect = "SELECT * FROM tracks";
        db.query(sqlSelect, (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    }
});

app.get('/api/getdifart', (req, res) => {
    res.send(tracksWithDifferentArtists);
});

app.get('/api/getdifgen', (req, res) => {
    res.send(tracksWithDifferentGenres);
});

app.post('/api/insert', (req, res) => {
    const   title = req.body.title,
            artist = req.body.artist,
            genre = req.body.genre;
    
    db.query("INSERT INTO tracks (title, artist, genre) values (?, ?, ?)", [title, artist, genre], function (err, data) {
        if (err) return console.log(err);
    });
});

app.listen(3001, () => console.log("Сервер запущен"));