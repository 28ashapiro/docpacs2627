const db = require('../models/database')
const fs = require('fs');
const path = require('path')


try {
    function initMigrationsTable() {
        console.log('migration table init starting');

        db.exec(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                name TEXT NOT NULL PRIMARY KEY,
                timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Migration table created!');
    }

    initMigrationsTable();

    const migrationsDir = path.join(__dirname, '..', 'migrations');

    const migrationFiles = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.js'));

    migrationFiles.sort();

    console.log(`Found migration files: ${migrationFiles}`);

    const completedMigrations = new Set(
        db.prepare('SELECT name FROM schema_migrations')
            .all()
            .map(element => element.name)
    );

    for (const file of migrationFiles) {
        const migrationPath = path.join(migrationsDir, file);

        console.log(`Pending jawns: ${migrationPath}`);

        const migration = require(migrationPath);

        if (completedMigrations.has(migration.migName)) {
            continue;
        }

        try {
            const transaction = db.transaction(() => {
                const result = migration.up(db);

                if (result === false) {
                    throw new Error('Migration returned false');
                }

                db.prepare(`
                    INSERT INTO schema_migrations (name)
                    VALUES (?)
                `).run(migration.migName);
            });

            transaction();

            console.log(`Successfully completed ${migration.migName}!`);

            completedMigrations.add(migration.migName);

        } catch (error) {
            console.error(`Migration failed: ${migration.migName}`);
            throw error;
        }
    }

    console.log('All migrations completed!');

} catch (error) {
    console.error('Migration process failed:', error);
    process.exitCode = 1;

}

