const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/app.db');

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

//const tableInfo = db.prepare(`PRAGMA table_info(whatissubmitted)`).all();
//console.log('Table structure:', tableInfo);

db.prepare(`INSERT INTO whatissubmitted (YouSubmittedAForm, DaSource) VALUES (?, ?)`).run('IAmTestValue', 'IAmATestinfSource');