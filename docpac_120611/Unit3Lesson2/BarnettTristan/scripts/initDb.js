const Database = require('better-sqlite3');
const {db} =  require('../models/database.js');

const what = `CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT,
    value TEXT,
    time DATE);`

db.exec(what);
console.log('should have a database');

db.close();