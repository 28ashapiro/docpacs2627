const express = require('express');
const app = express();
require('dotenv').config();

console.log(process.env.PORT);
console.log(process.env.APP_NAME)
const port = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());

const db = require('./database')
const createTableSQL = `
CREATE TABLE IF NOT EXISTS scores(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
)
`;
db.exec(createTableSQL);
console.log('PlayerScores!');

app.post('/api/scores', (req, res) => {
    let name = req.body.name;
    let trimmedName = name.trim();

    let score = req.body.score;

    if (trimmedName.length === 0 || trimmedName.length > 50) {
        res.status(400).json({ error: "400 Error! No Blank Names, or names over 20 characters!" });
        return;
    }

    if (score < 0 || !Number.isInteger(score)) {
        res.status(400).json({ error: "Negative Numbers Or Decimals Allowed!" });
        return;
    }

    const insertSQL = "INSERT INTO scores (name, score) VALUES (?, ?)";
    const stmt = db.prepare(insertSQL);
    stmt.run(trimmedName, score);
    console.log("Thanks For Playing! Scores Are Now Being Sent!", trimmedName, score);

    res.status(200).json({
        message: "Your score Is Being Sent!",
        name: trimmedName,
        score: score
    });
});

app.get('/api/scores', (req, res) => {
    const selectSQL = "SELECT * FROM scores ORDER BY score DESC LIMIT 10";
    const stmt = db.prepare(selectSQL);
    const rows = stmt.all()
    res.json(rows)
});

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} is running on http://localhost:${port}`);
});

console.log("Hi again");
console.log("1990");
console.log("5 * 2 = 10");
console.log("Score = 100");
console.log("Hello World");