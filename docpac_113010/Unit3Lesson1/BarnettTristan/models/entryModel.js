const Database = require('better-sqlite3');
const {db} =  require('../models/database.js');

const insert = db.prepare (`INSERT INTO entries (value, source, time) VALUES (?,?,?)`)

const rows = db.prepare(`SELECT * FROM entries`).all();

module.exports = {insert, rows}