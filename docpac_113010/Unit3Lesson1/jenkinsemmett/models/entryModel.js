const db = require('../models/database.js')

class accessDb {
    constructor() {
        this.a = db.prepare('INSERT INTO enteries (source, date, value) VALUES (?, ?, ?)');
        this.b = db.prepare('SELECT * FROM enteries');
        this.c = db.prepare('SELECT * FROM enteries WHERE id = ?');
        this.d = db.prepare('SELECT * FROM enteries WHERE source = ?');
        this.e = db.prepare('DELETE FROM enteries WHERE id = ?');
    }
    add(source, date, value){
        if (source){} else {source = null;}
        if (date){} else {date = null;}
        if (value){} else {value = null;}
        this.a.run(source, date, value);
    }
    getall(){
        return this.b.all();
    }
    getone(id){
        return this.c.get(id);
    }
    getsome(source){
        return this.d.all(source);
    }
    delete(id){
        this.e.run(id);
    }
}

module.exports = new accessDb;