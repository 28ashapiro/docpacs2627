const createuserTable = `
   CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`
const dropuserTable = `DROP TABLE users`;

//This is for 001_create_users_table.js
module.exports = {
  version: "001_create_users_table",
  up: (db) => {
    db.exec(createuserTable);
  },
  down: (db) => {
    db.exec(dropuserTable);
  }
};