const db = require('../models/database')
const createTableSQL = `CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    source TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP)`;
db.exec(createTableSQL);
console.log('Intialization complete');
db.close();