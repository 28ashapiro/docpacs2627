const express = require('express');
const session = require('express-session');
const app = express();
const SqliteStore = require("better-sqlite3-session-store")(session)
const {db2} = require('../models/database.js');

sessionSave =session({
      secret: process.env.SHH,
      store: new SqliteStore({
        client: db2, 
        resave: false,
        saveUninitialized: false,
        cookie :{
          httpOnly: true
        },
        expired: {
          clear: true,
          intervalMs: 900000 //ms = 15min
        }
      }),
      resave: false,
    })

  module.exports = {sessionSave}