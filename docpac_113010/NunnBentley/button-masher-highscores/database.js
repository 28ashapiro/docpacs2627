const Database = require("better-sqlite3")
const path = require("path")
const fs = require("fs")

fs.mkdirSync(path.join(__dirname, "data"), { recursive: true })
const db = new Database(path.join(__dirname, "data", "scores.db"))

db.exec(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
    )
`)

module.exports = db


