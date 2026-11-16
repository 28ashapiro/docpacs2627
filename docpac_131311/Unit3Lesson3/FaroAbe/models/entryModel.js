const db = require('./database');


const insertStmt = db.prepare(`
    INSERT INTO entries (value, source)
    VALUES (?, ?)
`);

const selectAllStmt = db.prepare(`
    SELECT * FROM entries
    ORDER BY created_at DESC
`);


function createEntry(value, source) {
    const info = insertStmt.run(value, source);
    return info.lastInsertRowid;
}


function getAllEntries() {
    return selectAllStmt.all();
}

module.exports = {
    createEntry,
    getAllEntries
};
