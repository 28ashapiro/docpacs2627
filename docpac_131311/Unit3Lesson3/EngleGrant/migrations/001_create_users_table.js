const appDb = require("../models/database");
changelogMessage = "Created users table with id, user, email, password, and creation_date columns." 

function up() {
    
    var fail = false;
    appDb.exec(`BEGIN TRANSACTION;`)

    try {
        appDb.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                creation_date DATETIME
            );
        `)
    } catch (err) {
        fail = true
        appDb.exec(`ROLLBACK;`)
        throw new Error(`Migration failed; ${err.code}`)
    }
    if (!fail) {
        appDb.exec(`COMMIT;`)
        console.log(changelogMessage)
        return true
    }
}

function down() {
    var fail = false;
    appDb.exec(`BEGIN TRANSACTION;`)

    try {
        appDb.exec(`DROP TABLE IF NOT EXISTS users;`)
    } catch (err) {
        fail = true
        appDb.exec(`ROLLBACK;`)
        throw new Error(`Migration undo failed; ${err.code}`)
    }
    if (!fail) {
        appDb.exec(`COMMIT;`)
        console.log("Migration undone. Hope you saved your data! :)")
        return true
    }
}

module.exports = { up };