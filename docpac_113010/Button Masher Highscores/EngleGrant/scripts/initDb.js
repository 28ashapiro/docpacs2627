const database = require("../database.js")

database.exec(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
    );
`);

console.log("Database updated")
database.close()