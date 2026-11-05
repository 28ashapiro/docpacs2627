const expressSession = require("express-session");
const SqliteStore = require("better-sqlite3-session-store")(expressSession); // Uses components found in express-session to make the session store.
sessionsDb = require("../models/sessions");

const session = expressSession({
    store: new SqliteStore({ // Optional for session creation, says where it should be stored instead of using memory. Yucky.
        client: sessionsDb
    }),

    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 120000
    }
});

module.exports = session;