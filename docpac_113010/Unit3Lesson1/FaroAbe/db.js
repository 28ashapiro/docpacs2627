const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'scores.db');
const db = new Database(dbPath);

console.log('SCORE!!!! Also here is the path buddy:', dbPath);

module.exports = db;
