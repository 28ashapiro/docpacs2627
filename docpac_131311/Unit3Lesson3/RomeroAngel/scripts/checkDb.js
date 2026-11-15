const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/app.db');

console.log('\n=== TABLES IN DATABASE ===');
const tables = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table'
`).all();
console.log(tables);

console.log('\n=== WHATISSUBMITTED TABLE DATA ===');
const whatissubmitted = db.prepare('SELECT * FROM whatissubmitted').all();
console.log(whatissubmitted);

console.log('\n=== USERS TABLE STRUCTURE ===');
const users = db.prepare('PRAGMA table_info(users)').all();
console.log(users);

db.close();