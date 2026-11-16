const db = require('./database');

const inputEntry = db.prepare(`
    INSERT INTO database (input, method)
    VALUES (?, ?)
`)

const selectEntries = db.prepare(`
    SELECT id, input, method, timestamp
    FROM database
    ORDER BY id DESC
`);

function createEntry(input, method) {
    const result = inputEntry.run(input, method);
    return result.lastInsertRowid;
}

function getAllEntries() {
    return selectEntries.all()
}

module.exports = {
    createEntry,
    getAllEntries
}