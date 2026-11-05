const db = require('./database');

const insertEntry = db.prepare(`
    INSERT INTO entries (value, source)
    VALUES (?, ?)
`);

const selectAllEntries = db.prepare(`
    SELECT * FROM entries
    ORDER BY id DESC
`);

function createEntry(value, source) {
    return insertEntry.run(value, source);
}

function getAllEntries() {
    return selectAllEntries.all();
}

module.exports = {createEntry, getAllEntries};