const fs = require('fs');
const db = require('../models/database.js');
const path = require('path');

const migrationsPath = path.join(__dirname, '../migrations');
const allFiles = fs.readdirSync(migrationsPath);
const migrationFiles = allFiles
    .filter(file => file.endsWith('.js'))
    .sort();

db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
    migration_name TEXT PRIMARY key,
    date_applied TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

const completedMigrations = db.prepare(`
    SELECT migration_name FROM schema_migrations
`).all().map(row => row.migration_name);

const nonCompletedMigrations = migrationFiles.filter(file => !completedMigrations.includes(file));
console.log(`Pending Migrations: ${nonCompletedMigrations.length}`);

const applyMigration = db.transaction((migration, migrationModule) => {
    migrationModule.up(db); //Passes database into up so that it can execute SQL statements
    db.prepare(`
        INSERT INTO schema_migrations (migration_name)
        VALUES (?)
    `).run(migration);
})

if (nonCompletedMigrations.length === 0) {
    console.log("The database is already current!");
} else {
    nonCompletedMigrations.forEach(migration => {
        const migrationModule = require(path.join(migrationsPath, migration));
        try {
            applyMigration(migration, migrationModule);
            console.log(`Applied Migration: ${migration}`);
        } catch (error) {
            console.error(`Migration Failed: ${migration}`);
            console.error(error.message);
            process.exit(1);
        }
    });
}

db.close();
console.log("Database closed successfully!");