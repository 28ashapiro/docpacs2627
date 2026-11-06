const db = require('../models/database')

function init() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS database (
       id INTEGER PRIMARY KEY,
       input TEXT NOT NULL,
       method TEXT NOT NULL,
       timestamp TEXT DEFAULT CURRENT_TIMESTAMP         
    );`
    );

    console.log('Database initialized!');
}

module.exports = init