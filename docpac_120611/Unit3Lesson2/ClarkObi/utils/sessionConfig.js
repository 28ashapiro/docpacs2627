const sql=require('better-sqlite3');
const db = new sql('C:/Users/obi.clark/Documents/GitHub/docpacs2627/docpac_120611/Unit3Lesson2/ClarkObi/data/sessions.db');
const dotenv = require('dotenv');
dotenv.config();
const es=require('express-session');
const sessql=require('express-session-sqlite');
const sqlitestore=sessql.default(es)
const secret=process.env.SESSION_SECRET
const sessionStore=new sqlitestore({db:db});
const sessionMiddleware=es({
    secret:secret,
    resave:false,
    saveUninitialized:false,
    store:sessionStore
});
module.exports=sessionMiddleware
