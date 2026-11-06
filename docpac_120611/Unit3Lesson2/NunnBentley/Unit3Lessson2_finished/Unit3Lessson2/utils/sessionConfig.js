const session = require('express-session')
const SQLiteStore = require('better-sqlite3-session-store')(session)
const path = require('path')
const Database = require('better-sqlite3')

const sessionDB = new Database(path.join(__dirname, '../sessions.db'))

const store = new SQLiteStore({
    client: sessionDB,
    expired: {
        clear: true,
        intervalMs: 15 * 60 * 1000
    },

})

const sessionmiddleware = session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    saveUninitialized: false
})

module.exports = {sessionmiddleware}
