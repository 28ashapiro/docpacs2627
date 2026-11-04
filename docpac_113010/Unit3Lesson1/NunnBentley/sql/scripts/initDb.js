const db = require('../models/database');

db.db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
    PersonID INTEGER PRIMARY KEY,
    Age INTEGER,
    Time DATETIME,
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`
)     

console.log('Database started successfully.');
console.log('database is closed')