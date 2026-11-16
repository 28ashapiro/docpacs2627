const appDb = require("../models/database");
changelogMessage = "Added display_name, update_at, and is_active columns to users table."

function up() {
    var fail = false;
    appDb.exec(`BEGIN TRANSACTION;`)

    try {
        appDb.exec(`ALTER TABLE users ADD COLUMN display_name TEXT`)
        appDb.exec(`ALTER TABLE users ADD COLUMN updated_at DATETIME`)
        appDb.exec(`ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL`)
    } catch (err) {
        fail = true
        appDb.exec(`ROLLBACK;`)
        return false
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
        return false
    }
    if (!fail) {
        appDb.exec(`COMMIT;`)
        console.log("Migration undone. Hope you saved your data! :)")
        return true
    }    
}

module.exports = { up };