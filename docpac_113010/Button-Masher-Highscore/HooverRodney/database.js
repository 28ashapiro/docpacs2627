// const path = require('path');
// const Database = require('better-sqlite3');
// const options = {
//     fileMustExist: false,
// };

// const db = new Database(path.join(__dirname, 'data', 'scores.db'), options);

// db.exec(`
//     CREATE TABLE IF NOT EXISTS scores (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     score INTEGER NOT NULL
//     );
// `);

// module.exports = db;

//ABOVE CODE IS FROM WHEN I MISTAKENLY INSTALLED BETTER-SQLITE3 INSTEAD OF NORMAL SQLITE3
//THE BELOW CODE IS WHAT MAGICSCHOOL TOLD ME TO REPLACE THE CODE WITH! LET ME KNOW IF I DID SOMETHING WRONG!

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'data', 'scores.db'), (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to scores.db');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Table creation error:', err.message);
    }
});

module.exports = db;
