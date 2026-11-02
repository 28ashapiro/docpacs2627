const appDb = require("../models/database");
const sessionsDb = require("../models/sessions");

appDb.exec(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL,
        source TEXT NOT NULL,
        creation_date DATETIME 
    );
`)

sessionsDb.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      sid INTEGER PRIMARY KEY AUTOINCREMENT,
      sess TEXT NOT NULL,
      expire INTEGER NOT NULL
    );
  `);

appDb.close()
sessionsDb.close()

console.log("Databases set up successfully.")