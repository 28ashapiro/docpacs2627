module.exports = {
    name: 'createUsersTable',
    up: (db) => { 
    db.exec(`ALTER TABLE users ADD COLUMN username TEXT;`);
    }
}