const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const nameLimit = 20;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// save a score !!!
app.post('/api/scores', (req, res) => {
    const name = req.body.name;
    const score = req.body.score;
    if (typeof name !== 'string' || name.trim() === '' || name.trim().length > nameLimit) {
        return res.status(400).json({ error: 'A valid player name is required (1-20 characters).' });
    }
    if (typeof score !== 'number' || !Number.isInteger(score) || score < 0) {
        return res.status(400).json({ error: 'Score must be a nonnegative integer.' });
    }
    db.run('INSERT INTO scores (name, score) VALUES (?, ?)', [name.trim(), score], function (err) {
        if (err) {
            console.log('Error saving score:', err.message);
            return res.status(500).json({ error: 'Score could not be saved.' });
        }
        res.status(201).json({ message: 'Score saved.', id: this.lastID });
    });
});

// get the ten highest scores !!!
app.get('/api/scores', (req, res) => {
    db.all('SELECT id, name, score FROM scores ORDER BY score DESC, id ASC LIMIT 10', [], (err, rows) => {
        if (err) {
            console.log('Error getting scores:', err.message);
            return res.status(500).json({ error: 'Scores could not be loaded.' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
