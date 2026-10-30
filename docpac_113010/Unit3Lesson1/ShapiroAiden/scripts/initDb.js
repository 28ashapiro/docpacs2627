const db = require('../models/database');

db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL,
        source TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`);

console.log('Database initialized successfully!');

db.close();