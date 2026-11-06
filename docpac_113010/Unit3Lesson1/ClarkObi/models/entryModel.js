const db=require('./database');
function addEntry(username,source){
    const sql='INSERT INTO entries(username,source) VALUES(?,?)'
    db.prepare(sql).run(username,source);
}
function getAllEntries(){
    const sql='SELECT * FROM entries'
    return db.prepare(sql).all();
}
module.exports={addEntry,getAllEntries}