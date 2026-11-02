const express = require('express');
const app = express();
const db = require('./database');

app.use(express.static('public'));

app.use(express.json());

console.log('datatabase connected', db.name)

db.exec(`
    CREATE TABLE IF NOT EXISTS database (
       id INTEGER PRIMARY KEY,
       name TEXT NOT NULL,
       score INTEGER NOT NULL        
    );`
);
console.log('Database initialized!');

app.get('/api/scores', (req,res) => {
    const result = db.prepare(
        'SELECT * FROM database ORDER BY score DESC, id ASC LIMIT 10'
    ).all()
    res.json(result)
})

app.post('/api/scores', (req, res) => {    
    const name = req.body.name
    const score = req.body.score
    if (typeof name.trim() !== 'string' || name.trim() === '' || name.trim().length > 20) {
        return res.status(400).json({error: 'Invalid player name'});
    };
    
    if(!Number.isInteger(score) || score < 0){
        return res.status(400).json({error: 'Invalid score'})
    };

    try{
        const result = db.prepare(
            'INSERT INTO database (name, score) VALUES (?, ?)'
        ).run(name.trim(), score);

        return res.status(201).json({
            message: 'Score saved successfully!',
            id: result.lastInsertRowid
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: 'Could not save score!'
        });
    };
});



app.listen(3000, () => {
    console.log('PORT 3000 RUNNING');
    console.log('URL: http://localhost:3000');
});
