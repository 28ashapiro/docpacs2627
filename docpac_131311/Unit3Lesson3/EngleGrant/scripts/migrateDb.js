/*
1: Open the appDb connection ^
2: Ensure a table called "migration-tracking" exists in app.db ^
3: Use fs module to read the "migrations" folder ^
4: Sort the contents of the "migrations" folder by name (001 first, 002 second, etc) ^
5: Retrieve the names of the completed migrations from app.db ^
6: Identify which migrations still need to be done based on what is in app.db ^
7: Run each of the migrations in order ^
8: Record successful migrations ^
9: Report what was changed/applied ^
10: Close database cleanly via appDb.close() ^

-- If no migrations pending, say database is up to date.
*/

const path = require("path");
const appDb = require("../models/database");
const fs = require("fs");
const database = require("../models/database");

const mainPath = path.join(__dirname,"..")

var migrationFiles = [];
var successfulMigrations = [];
var pendingMigrations = [];

migrate()

function migrate() {
    console.log("\nChecking migrations\n")

    if (!findMigrationTable()) {
        throw new Error("Migration Tables not found in connected database.")
    }

    determinePendingMigrations()
    runMigrations()
}

function findMigrationTable() {
    queryResult = appDb.prepare(`
            SELECT EXISTS (
                SELECT 
                    name
                FROM 
                    sqlite_master
                WHERE 
                    type='table' AND 
                    name='schema_migrations'
            ) AS table_exists;
        `).get()
    return queryResult["table_exists"]
}

function getMigrationFiles() {
    migrationFiles = fs.readdirSync(path.join(mainPath,"/migrations")).sort();
    return migrationFiles;
}

function getSuccessfulMigrations() {
    successfulMigrations = appDb.prepare(`
        SELECT DISTINCT migration_name FROM schema_migrations;
    `).all()
    return successfulMigrations
}

function determinePendingMigrations() {
    migrationFiles = getMigrationFiles()
    successfulMigrations = getSuccessfulMigrations()

    out = []
    successfulMigrations.forEach(element => {
        out.push(element.migration_name)
    });
    successfulMigrations = out

    if (successfulMigrations) {
        successfulMigrations.forEach(migration => {
            console.log(`${migration} was already applied`)
        });
        pendingMigrations = migrationFiles.filter(item => !successfulMigrations.includes(item))
    } else {
        console.log("No migrations applied")
        pendingMigrations = migrationFiles
    }
}

function runMigrations() {
    console.log("")
    pendingMigrations.forEach(migration => {
        const file = require(`../migrations/${migration}`)
        if (file.up()) {
            database.prepare(`
                INSERT INTO schema_migrations (migration_name, applied_date)
                VALUES (?, ?);    
            `).run(migration ,Date())
        } else {
            throw new Error(`Error occurred in ${migration}, did not finish migrations`)
        }
    });
    database.close()
}