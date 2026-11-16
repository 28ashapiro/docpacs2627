const db = require('../models/database.js')

class accessDb {
    constructor() {
        this.a = db.prepare('INSERT INTO enteries (source, date, value) VALUES (?, ?, ?)');
        this.b = db.prepare('SELECT * FROM enteries');
        this.c = db.prepare('SELECT * FROM enteries WHERE id = ?');
        this.d = db.prepare('SELECT * FROM enteries WHERE source = ?');
        this.e = db.prepare('DELETE FROM enteries WHERE id = ?');
        this.f = db.prepare('SELECT * FROM schema_migrations')
        this.g = db.prepare('INSERT INTO schema_migrations (date, givenName) VALUES (?, ?)');
        this.u = db.prepare('SELECT * FROM users')
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
    sgetall(){
        return this.f.all();
    }
    sadd(date, value){
        if (date){} else {date = null;}
        if (value){} else {value = null;}
        this.g.run(date, value);
    }
    ugetall(){
        return this.u.all();
    }
}

module.exports = new accessDb;