
const {db} =  require('../models/database.js');
const fs = require('fs')
const path = require('path')

const migrationsDir = path.join(__dirname, '../migrations')
db3.pragma('journal_mode=WAL')

    db3.exec(`CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fileName TEXT NOT NULL UNIQUE,
    time TEXT DEFAULT CURRENT_TIMESTAMP);`);

specialInsert = db3.prepare(`INSERT INTO migrations (fileName) VALUES (?)`);
const migrations = [
    {
        version: 1,
        up: (db) => {try{db.exec(user)} catch (error){console.log('failed to create users database')
        } specialInsert.run('createUsers')},
        down: `DROP TABLE users;`
    },
    {
        version: 2,
        up: (db) => {try{db.exec(fieldAddtion)} catch (error){console.log('failed to create users database')
        } specialInsert.run('updateUsers')},
        down: `ALTER TABLE users DROP COLUMN password,
               ALTER TABLE users DROP COLUMN username;`
    }
];

function migrate(database, migrationList){
    const currentVersion = database.pragma('user_version', {simple:true});

    for (let i = currentVersion; i < migrationList.length; i++) {
        const nextVersion = i + 1;
        const sql = migrationList[i];
        const applyMigration = database.transaction((database) => {
            database.exec(sql);
            database.pragma(`user_version = ${nextVersion}`);
        });

        applyMigration();
        console.log(`Migrated to version ${nextVersion}`)
    }
}
migrate(db, migrations);
console.log('should have a the MigrationDb');

db3.close();