const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data');

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

const dbPath = path.join(dataPath, 'app.db');

const db = new Database(dbPath);

module.exports = db;