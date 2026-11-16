const session = require('express-session');
const SqliteStore = require('better-sqlite3-session-store')(session);
const Database = require('better-sqlite3');
const path = require('path');

const sessionDbPath = path.join(__dirname, '..', 'data', 'sessions.db');
const sessionDb = new Database(sessionDbPath);

const sessionMiddleware = session({
    store: new SqliteStore({
        client: sessionDb,
        expired: {
            clear: true,
            intervalMs: 900000 // Clean up expired sessions every 15 minutes
        }
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false
    }
});

module.exports = sessionMiddleware;
