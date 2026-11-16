const session = require("express-session");
const sqlSession = require('better-sqlite3-session-store')(session)
const Database = require('better-sqlite3');

const sdb = new Database('data/session.db');

module.exports = session(
    {
        store: new sqlSession({
            client: sdb,
            expired: {
                clear: true,
                intervalMs: 900000 //ms = 15min
            }
        }),
        secret: "abcde",
        resave: false
    }
)