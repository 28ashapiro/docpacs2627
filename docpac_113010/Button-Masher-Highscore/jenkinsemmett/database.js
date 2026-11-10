const Database = require('better-sqlite3');

//Create Object With Database Commands
class accessDb {
    constructor() {
        //Initialize Connection
        this.db = new Database('data/app.db');
        
        console.log('database connected');

        //Create The Table If It Doesn't Exist
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            score INTEGER NOT NULL
        );
        `);        

        this.a = this.db.prepare('INSERT INTO scores (name, score) VALUES (?, ?)');
        this.b = this.db.prepare('SELECT * FROM scores');
        this.c = this.db.prepare('SELECT * FROM scores WHERE id = ?');
        this.d = this.db.prepare('DELETE FROM scores WHERE id = ?');
    }
    add(name, score){
        if (name){} else {name = null;}
        if (score){} else {score = null;}
        this.a.run(name, score);
    }
    getall(){
        return this.b.all();
    }
    getone(id){
        return this.c.get(id);
    }
    delete(id){
        this.d.run(id);
    }
}

//Export Modules
module.exports = new accessDb;