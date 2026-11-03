const session = require("express-session");
const SQLiteStore = require('better-sqlite3-session-store')(session);
const Database = require("better-sqlite3");
const sessionDb = new Database('sessions.db');

const store = new SQLiteStore({
    client: sessionDb
});

module.exports = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    name: "ThisCookieSavesInfo",
    cookie: {
        httpOnly: true,
        secure: false
    }
});