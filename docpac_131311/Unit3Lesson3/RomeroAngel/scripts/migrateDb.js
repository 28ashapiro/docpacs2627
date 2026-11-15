const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const { version } = require('os');
const console = require('console');

const db = new DatabaseSync('./data/app.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS 
    schema_migrations(version TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)
    `);

fs.readdir('./migrations', (err, files) => {
    if (err) {
        console.log(err);
    } else {

        console.log('Migration files found:', files);

        files.sort();

        const completedMigrations = db.prepare('SELECT version FROM schema_migrations').all();

        const pendingMigrations = []

        files.forEach(file => {
            const isCompleted = completedMigrations.find(migration => migration.version === file);

            if (!isCompleted) {
                pendingMigrations.push(file);
            }
        });

        console.log("This is a pending migrations", pendingMigrations);
        console.log('You should see this if it works!', completedMigrations);

        pendingMigrations.forEach(file => {
            db.exec(`BEGIN TRANSACTION`)
            const migration = require(`../migrations/${file}`);
            migration.up(db);
            db.prepare('INSERT INTO schema_migrations (version) VALUES (?)').run(file);
            console.log("");
            db.exec(`COMMIT`)
        });

        if (pendingMigrations.length > 0) {
            console.log("The two migrations are now sucessful!", pendingMigrations);
        } else {
            console.log("Database is a-ok no need to migrate anything!", completedMigrations);
        }
    }
    const allSubmittedRows = db.prepare(`SELECT * FROM whatissubmitted`).all();
    console.log('All whatissubmitted rows:', allSubmittedRows);

    const allUsers = db.prepare(`SELECT * FROM users`).all();
    console.log('All users:', allUsers);

    const allMigrations = db.prepare(`SELECT * FROM schema_migrations`).all();
    console.log('All migrations:', allMigrations);

    db.close();
});