module.exports = {
    name: "001_create_users_table.js",
    up: function (db) {
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY key AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
}