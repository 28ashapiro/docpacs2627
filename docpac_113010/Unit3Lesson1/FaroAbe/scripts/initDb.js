const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');


const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log('Folder');
}

const dbPath = path.join(dataDir, 'scores.db');
const db = new Database(dbPath);

const createTableSQL = `
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

db.exec(createTableSQL);

console.log('Data:', dbPath);
console.log('Score');

db.close();
