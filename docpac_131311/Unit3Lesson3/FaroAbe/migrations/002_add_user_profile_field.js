module.exports = {
    up: (db) => {
        db.exec(`
            ALTER TABLE users 
            ADD COLUMN display_name TEXT
        `);
    }
};