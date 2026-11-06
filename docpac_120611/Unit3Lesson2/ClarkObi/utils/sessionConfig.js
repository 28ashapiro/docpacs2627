const sql=require('better-sqlite3');
const db = new sql('C:/Users/obi.clark/Documents/GitHub/docpacs2627/docpac_120611/Unit3Lesson2/ClarkObi/data/sessions.db');
const dotenv = require('dotenv');
dotenv.config();
const es=require('express-session');
const sqlitestore=require('better-sqlite3-session-store')(es);
const secret=process.env.SESSION_SECRET
//const sessionStore=new sqlitestore({
//    driver: sql,
//    path: 'C:/Users/obi.clark/Documents/GitHub/docpacs2627/docpac_120611/Unit3Lesson2/ClarkObi/data/sessions.db',
//    ttl:86400000
//});
const sessionMiddleware=es({
    store: new sqlitestore({client:db}),
    secret:secret,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:86400000}
});
module.exports=sessionMiddleware
