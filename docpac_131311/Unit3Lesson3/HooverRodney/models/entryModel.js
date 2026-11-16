const db = require('../models/database.js');

function createEntry(value, source) {
    const sql = `INSERT INTO entries (value, source) VALUES (?, ?)`;
    const entries = db.prepare(sql).run(value, source);
    return entries;
}

function getAllEntries() {
    const sql = `SELECT * FROM entries ORDER BY created_at DESC`;
    const entries = db.prepare(sql).all();
    return entries;
}

module.exports = {
    createEntry,
    getAllEntries
}