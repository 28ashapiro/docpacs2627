const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'app.db');
const migrationsPath = path.join(__dirname, '..', 'migrations');

const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

const getCompletedMigrations = () => {
    const stmt = db.prepare('SELECT name FROM schema_migrations');
    return stmt.all().map(row => row.name);
};

const getMigrationFiles = () => {
    if (!fs.existsSync(migrationsPath)) {
        return [];
    }
    return fs.readdirSync(migrationsPath)
        .filter(file => file.endsWith('.js'))
        .sort();
};

const recordMigration = (name) => {
    const stmt = db.prepare('INSERT INTO schema_migrations (name) VALUES (?)');
    stmt.run(name);
};

const runMigrations = () => {
    const completed = getCompletedMigrations();
    const allMigrations = getMigrationFiles();
    const pending = allMigrations.filter(m => !completed.includes(m));

    if (pending.length === 0) {
        console.log('No pending migrations');
        return;
    }

    console.log(`Running ${pending.length} migration(s)...`);

    pending.forEach(filename => {
        console.log(`Applying: ${filename}`);

        const migration = require(path.join(migrationsPath, filename));

        const runMigration = db.transaction(() => {
            migration.up(db);
            recordMigration(filename);
        });

        try {
            runMigration();
            console.log(`${filename} completed`);
        } catch (err) {
            console.error(`${filename} failed:`, err.message);
            process.exit(1);
        }
    });

    console.log('All migrations completed successfully');
};

runMigrations();
db.close();