const db = require('../models/database.js')

db.exec(`
  CREATE TABLE IF NOT EXISTS enteries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    date TEXT NOT NULL,
    value TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    givenName TEXT NOT NULL
  );
`);

console.log('Database Initialized');