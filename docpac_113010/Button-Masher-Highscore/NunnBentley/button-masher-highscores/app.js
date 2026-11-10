
const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_NAME_LENGTH = 20;


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


const insertScore = db.prepare('INSERT INTO scores (name, score) VALUES (?, ?)');
const topScores = db.prepare(
    'SELECT id, name, score FROM scores ORDER BY score DESC, id ASC LIMIT 10'
);


app.post('/api/scores', (req, res) => {
    const body = req.body || {};

    if (typeof body.name !== 'string') {
        return res.status(400).json({ error: 'Name is required.' });
    }
    const name = body.name.trim();
    if (name.length === 0) {
        return res.status(400).json({ error: 'Name cannot be empty.' });
    }
    if (name.length > MAX_NAME_LENGTH) {
        return res
            .status(400)
            .json({ error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` });
    }

    const score = body.score;
    if (score === undefined || score === null) {
        return res.status(400).json({ error: 'Score is required.' });
    }
    if (!Number.isInteger(score)) {
        return res.status(400).json({ error: 'Score must be a whole number.' });
    }
    if (score < 0) {
        return res.status(400).json({ error: 'Score cannot be negative.' });
    }

    try {
        const result = insertScore.run(name, score);
        res.status(201).json({ message: 'Score saved', id: Number(result.lastInsertRowid) });
    } catch (err) {
        console.error('Insert failed:', err.message);
        res.status(500).json({ error: 'Could not save the score.' });
    }
});

app.get('/api/scores', (req, res) => {
    try {
        res.json(topScores.all());
    } catch (err) {
        console.error('Query failed:', err.message);
        res.status(500).json({ error: 'Could not load scores.' });
    }
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err.status === 400) {
        return res.status(400).json({ error: 'Invalid JSON.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
