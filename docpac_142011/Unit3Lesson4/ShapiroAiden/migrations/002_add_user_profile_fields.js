function up(db) {
    db.exec(`
        ALTER TABLE users
        ADD COLUMN display_name TEXT NOT NULL DEFAULT '';
    `);
}

module.exports = {
    up
};