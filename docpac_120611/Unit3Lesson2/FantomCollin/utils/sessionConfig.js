const Database = require('better-sqlite3')
const session = require('express-session');
const Sqlitestore = require('better-sqlite3-session-store')(session);
const path = require('path')

const dbPath = path.join(__dirname, '..', 'data', 'sessions.db')
const db = new Database(dbPath)

const sessionMiddleware = session({
    store: new Sqlitestore({
        client: db,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: function (req) {
        var match = req.url.match(/^\/([^/]+)/);
        return {
            path: match ? '/' + match[1] : '/',
            httpOnly: true,
            secure: process.env.USE_HTTPS === 'true' || false,
            maxAge: 9999999999,
        };
    }
});
module.exports = sessionMiddleware