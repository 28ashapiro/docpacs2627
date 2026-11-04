const Database = require('better-sqlite3');

const db = new Database('data/app.db');
 
console.log('database connected');

module.exports = db;