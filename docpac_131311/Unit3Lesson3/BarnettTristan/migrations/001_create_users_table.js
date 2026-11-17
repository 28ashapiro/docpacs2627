module.exports = {
    name: 'createUsersTable',
    up: (db) => { 
    db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP);`);
    }
}

