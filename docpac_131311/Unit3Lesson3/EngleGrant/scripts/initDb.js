const appDb = require("../models/database");
const sessionsDb = require("../models/sessions");

//----------------------------------------------

appDb.exec(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL,
        source TEXT NOT NULL,
        creation_date DATETIME 
    );
`)

appDb.exec(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      migration_name TEXT NOT NULL,
      applied_date DATETIME
  );
`)

//----------------------------------------------

sessionsDb.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      sid INTEGER PRIMARY KEY AUTOINCREMENT,
      sess TEXT NOT NULL,
      expire DATETIME NOT NULL
    );
  `);

appDb.close()
sessionsDb.close()

console.log("Databases set up successfully.")