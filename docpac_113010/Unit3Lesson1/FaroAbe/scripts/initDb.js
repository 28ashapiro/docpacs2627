const Database = require('better-sqlite3');
const path = require('path');


const dbPath = path.join(__dirname, '..', 'data', 'app.db');


const db = new Database(dbPath);

const createTableSQL = `
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL,
        source TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`;

db.exec(createTableSQL);

console.log('Db Init');
console.log('Table Is Ready');

db.close();
