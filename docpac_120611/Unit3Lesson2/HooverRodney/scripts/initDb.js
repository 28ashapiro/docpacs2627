const db = require('../models/database.js');

db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY key AUTOINCREMENT,
    value TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);
//the above table is meant to store submitted form and query values
//value is the submitted value

console.log("Database successfully initialized! Table 'entries' created!");
db.close();
console.log("Database closed.")