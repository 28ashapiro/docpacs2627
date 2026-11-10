const database = require("../database")

function createEntry(name,score) {
    database.prepare(
        "INSERT INTO scores (name, score) VALUES (?, ?)"
    ).run(name,score)

    console.log(`Adding entry to scores: ${name}, ${score}`)
};

function getEntries(limit) {
    entries = database.prepare(
        `SELECT * FROM scores 
            ORDER BY score DESC
            LIMIT ${limit}`
    ).all()

    return entries;
};

module.exports = { createEntry, getEntries};