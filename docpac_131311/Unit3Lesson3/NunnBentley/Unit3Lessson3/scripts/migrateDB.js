const fs = require('fs');
const path = require('path');
const { db } = require('../models/database')

const migrationsDir = path.join(__dirname, '../migrations')

db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
        name TEXT NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

function getMigrationFiles() {
    return fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.js'))
        .sort();
}

function getAppliedNames() {
    return new Set(db.prepare('SELECT name FROM migrations').all().map(row => row.name))
}
const applyMigration = db.transaction((migration) => {
    migration.up(db);
    db.prepare('INSERT INTO migrations (name) VALUES (?)').run(migration.name);
});

function runMigrations() {
    const applied = getAppliedNames();
    let ran = 0;

    for (const file of getMigrationFiles()) {
        const migration = require(path.join(migrationsDir, file))
        if (applied.has(migration.name)) continue

        console.log(`Running migration: ${migration.name}`);
        applyMigration(migration);
        ran++;
    }

    console.log(ran === 0 ? 'No pending migrations.' : `Done. Ran ${ran} migration(s).`)
}

try {
    runMigrations();
} catch (error) {
    console.error('Migration failed:', error.message)
    process.exitCode = 1
} finally {
    db.close();
}