const database = require("./database");

function createEntry(value, source) {
    database.prepare(
        "INSERT INTO entries VALUES (?, ?, ?, DATETIME('now'))"
    ).run(undefined, value, source)

    console.log(`Adding entry to database: value: '${value}', source: '${source}'`)
}

function getAllEntries() {
    dbEntries = database.prepare(
        "SELECT * FROM entries"
    ).all()

    return dbEntries
}

module.exports = { createEntry, getAllEntries };