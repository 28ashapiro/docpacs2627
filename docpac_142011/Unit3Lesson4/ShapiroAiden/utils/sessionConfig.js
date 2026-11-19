const session = require('express-session');
const Database = require('better-sqlite3');
const SqliteStore = require('better-sqlite3-session-store')(session);
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'sessions.db');

const db = new Database(dbPath);

const sessionStore = new SqliteStore({
    client: db,
    expired: {
        clear: true,
        intervalMs: 900000
    }
});

const sessionConfig = session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
});

module.exports = sessionConfig;