const sqlite=require('better-sqlite3');
const app=new sqlite('C:/Users/obi.clark/Documents/GitHub/docpacs2627/docpac_120611/Unit3Lesson2/ClarkObi/data/app.db', { verbose: console.log });
module.exports=app