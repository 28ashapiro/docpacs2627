const sqlite = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "app.db");
const database = new sqlite(dbPath);
console.log("Database connection created")

module.exports = database;