const db = require('./database')

function createEntry(value, source) {
    db.prepare(`INSERT INTO whatissubmitted (YouSubmittedAForm, DaSource) VALUES (?, ?)`).run(value, source);
}

function getAllEntries() {
    const entries = db.prepare(`SELECT * FROM whatissubmitted`).all();
    return entries;
}

module.exports = { createEntry, getAllEntries };