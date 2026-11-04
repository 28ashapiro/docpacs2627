const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataFolder = path.join(__dirname, 'data');
const databasePath = path.join(dataFolder, 'scores.db');

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
}

const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.log('Error opening scores database:', err.message);
    } else {
        console.log('Connected to scores database!!');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL
)`, (err) => {
    if (err) {
        console.log('Error creating scores table:', err.message);
    } else {
        console.log('Scores table is good to go!!!');
    }
});

module.exports = db;

