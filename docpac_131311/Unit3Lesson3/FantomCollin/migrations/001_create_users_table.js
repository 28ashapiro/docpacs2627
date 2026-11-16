const migName = 'CreateUserTableuhhh';
function up(db) {

    db.exec(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                username TEXT NOT NULL UNIQUE,

                email TEXT NOT NULL UNIQUE,

                password TEXT NOT NULL,

                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);
};

function down (db) {
    
}


module.exports = { migName, up, down };