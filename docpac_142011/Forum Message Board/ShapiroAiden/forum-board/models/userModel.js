const db = require('../database');
const bcrypt = require('bcrypt');

function findUserByUsername(username) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

function findUserById(id) {
    return db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(id);
}

function createUser(username, password) {
    const passwordHash = bcrypt.hashSync(password, 12);
    const result = db.prepare(`
        INSERT INTO users (username, password_hash)
        VALUES (?, ?)
    `).run(username, passwordHash);

    return result.lastInsertRowid;
}

function checkPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
}

module.exports = {
    findUserByUsername,
    findUserById,
    createUser,
    checkPassword
};
