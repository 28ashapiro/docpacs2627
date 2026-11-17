const Database = require('better-sqlite3');
const {db} =  require('../models/database.js');

const user = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP);`

db.exec(user);