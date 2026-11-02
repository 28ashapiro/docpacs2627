const path = require('path');
const Database = require('better-sqlite3');
const options = {
    fileMustExist: false,
}

const db = new Database(path.join(__dirname, '../data', 'app.db'), options);

module.exports = db;