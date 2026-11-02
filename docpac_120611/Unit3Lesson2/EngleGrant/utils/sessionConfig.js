const session = require("express-session");
const sqliteStore = require("better-sqlite3-session-store")(session);
sessionsDb = require("../data/sessions.db")

session({
    store: new sqliteStore({
        client: sessionsDb,
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 30000,
        }
    })
})

module.exports = session;