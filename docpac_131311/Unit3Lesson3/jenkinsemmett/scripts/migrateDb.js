const db = require('../models/database.js');
const accessDb = require('../models/entryModel.js');
const fs = require('fs');

let migrations = [];
let completedM = accessDb.sgetall();

fs.readdirSync('./migrations/').forEach(file => {
    migrations.push(file);
});

let e = 0;
console.log('Performing Migrations:');
console.log('');

for(i = 0; i < migrations.length; i++){
    let o = false;

    for (u = 0; u < completedM.length; u++){
        if(migrations[i] == completedM[u].givenName){
            o = true;
            break;
        }
    }

    if (o == false){
        migrate = db.transaction((cats) => {
            eval(fs.readFileSync('./migrations/' + migrations[i], 'utf-8'));
            accessDb.sadd(JSON.stringify(new Date), migrations[i])
        }, (err) => {
            console.error(err.code);
        })

        migrate();
        console.log('Applied ./migrations/' + migrations[i]);    
        e++
    }
}

console.log('');

if (e == 0){
    console.log('No Migrations Performed');
} else {
    console.log('All Pending Migrations Performed');
}

db.close()