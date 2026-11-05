const db = require('../models/database');

const createTableSQL = `
CREATE TABLE IF NOT EXISTS whatissubmitted(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    YouSubmittedAForm TEXT,
    DaSource TEXT,
    TheTimeStamp TEXT DEFAULT CURRENT_TIMESTAMP
)
`;

db.exec(createTableSQL);
console.log('Hey!Hey!TheDataBaseWasMade!');

const tableInfo = db.prepare(`PRAGMA table_info(whatissubmitted)`).all();
console.log('Table structure:', tableInfo);

db.prepare(`INSERT INTO whatissubmitted (YouSubmittedAForm, DaSource) VALUES (?, ?)`).run('IAmTestValue', 'IAmATestinfSource');

const row = db.prepare(`SELECT * FROM whatissubmitted`).get();
console.log('Inserted row:', row);