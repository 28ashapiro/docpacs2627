const Database = require('better-sqlite3');

let db;
try {
    db = new Database('data/scores.db');
} catch (err) {
    console.log(`Failed to open data/scores.db: ${err.message}`);
}

module.exports = db;