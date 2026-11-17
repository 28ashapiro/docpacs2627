const {db} =  require('../models/database.js');
const fs = require('fs')
const path = require('path')

const migrationsDir = path.join(__dirname, '../migrations')

db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
        name TEXT NOT NULL UNIQUE,
        preformedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
);

function getMigrationFiles() {
    return fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.js'))
        .sort();
}

function getAppliedNames() {
    return new Set(db.prepare('SELECT name FROM migrations').all().map(row => row.name))
}
const applyMigration = db.transaction((migration) => {
    db.exec(migration);
    db.prepare('INSERT INTO migrations (name) VALUES (?)').run(migration.name)
});

function migrate() {
    const version = getAppliedNames();
    let ran = 0;

    for (const file of getMigrationFiles()) {
        const migration = require(path.join(migrationsDir, file))
        if (version.has(migration.name)) continue

        console.log(`running migration: ${migration.name}`);
        applyMigration(migration);
        ran++;
    }

    console.log(ran === 0 ? 'No pending migrations.' : `Done. Ran ${ran} the migrations of the database`);
    
}

try {
    migrate();
} catch (error) {
    console.error('Migration failed:', error.message);
    process.exitCode = 1
} finally {
    db.close();
}