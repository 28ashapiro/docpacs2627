const session = require('express-session');
const path = require('path');
const Database = require('better-sqlite3');
const sessionStore = require('better-sqlite3-session-store');
const sessionSecret = process.env.SESSION_SECRET;

const options = {
    fileMustExist: false,
}
const db = new Database(path.join(__dirname, '../data', 'sessions.db'), options);

const storeConstructor = sessionStore(session);

const store = new storeConstructor({
    client: db
});

const sessionMiddleware = session({
    store: store,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: "sessionCookie",
    cookie: {
        httpOnly: true,
        maxAge: 120000,
        secure: false
    }
});

module.exports = sessionMiddleware;

//actual code saving the visits to the database is within the packages — not something i wrote
//visits is an instructional value that will laterbe replaced or supplemented by authenticated user information