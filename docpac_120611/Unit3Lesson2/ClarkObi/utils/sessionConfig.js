const dotenv = require('dotenv');
dotenv.config();
const es=require('express-session')
const store=require('express-session-sqlite')
const sql=require('better-sqlite3')
const db=new sql('../data/sessions.db')
const secret=process.env.SESSION_SECRET
