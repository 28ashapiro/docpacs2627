const db = require('./database');

// create a user
function createUser(username, email, password, display_name) {
    const stmt = db.prepare(`
        INSERT INTO users(username, email, password, display_name)
        VALUES(?, ?, ?, ?)
    `);
    const result = stmt.run(username, email, password, display_name);
    return result.lastInsertRowid;
};

// find user by ID
function findUserById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
};

// find user by username
function findUserByUsername(username) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(username);
};

// find user by email
function findUserByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
};

module.exports = {createUser, findUserById, findUserByUsername, findUserByEmail};