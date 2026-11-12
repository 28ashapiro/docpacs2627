const fs = require('fs');
const path = require('path');
const db = require('../models/database');

const migrationsPath = path.join(__dirname, '..', 'migrations');

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            migration_name TEXT PRIMARY KEY,
            applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);
    const migrations = fs.readdirSync(migrationsPath)
        .filter(file => file.endsWith('.js'))
        .sort();
    const completedMigrations = db.prepare(`
        SELECT migration_name FROM schema_migrations
    `).all();

    const completedNames = completedMigrations.map(migration => migration.migration_name);
    let appliedCount = 0;
    for (const migrationFile of migrations) {
        if (completedNames.includes(migrationFile)) {
            console.log('SKIPPED:', migrationFile);
            continue;
        }
        console.log('RUNNING:', migrationFile);
        const migration = require(path.join(migrationsPath, migrationFile));
        const runMigration = db.transaction(() => {
            migration.up(db);
            db.prepare(`
                INSERT INTO schema_migrations (migration_name)
                VALUES (?)
            `).run(migrationFile);
        });
        runMigration();
        console.log('SUCCESS:', migrationFile);
        appliedCount++;
    }
    if (appliedCount === 0) {
        console.log('Database is already up to date!');
    } else {
        console.log(`${appliedCount} migration(s) applied successfully!`);
    }
} catch (error) {
    console.error('DATABASE MIGRATION ERROR:', error.message);
    process.exitCode = 1;
} finally {
    db.close();
}