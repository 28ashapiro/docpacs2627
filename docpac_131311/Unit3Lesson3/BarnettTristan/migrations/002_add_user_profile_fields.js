module.exports = {
    name: 'updateUsersTable',
    up: (db) => { 
    db.exec(`ALTER TABLE users ADD COLUMN username TEXT;`);
    }
}