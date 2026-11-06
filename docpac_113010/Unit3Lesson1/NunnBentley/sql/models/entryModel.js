const db  = require('../models/database');


function createEntries(age, time, source) {
    const insertStatement = db.db.prepare('INSERT INTO entries (Age, Time, source) VALUES (?, ?, ?)');
    return insertStatement.run(age, time, source);
}

function getAllEntries() {
    const selectStatement = db.db.prepare('SELECT * FROM entries ORDER BY created_at DESC');
    return selectStatement.all();
}

module.exports = {
    createEntries,
    getAllEntries
};