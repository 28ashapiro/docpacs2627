const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../data', 'scores.db');
const db = new Database(dbPath);


router.post('/', (req, res) => {
    console.log('POST /api/scores');
    const { name, score } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Name is required' });
    }


    if (name.trim().length < 2) {
        return res.status(400).json({ message: 'Name must be at least 2 characters' });
    }

    if (typeof score !== 'number' || isNaN(score)) {
        return res.status(400).json({ message: 'Score must be a number' });
    }

    if (score < 0) {
        return res.status(400).json({ message: 'Score cannot be negative' });
    }

    if (!Number.isInteger(score)) {
        return res.status(400).json({ message: 'Score must be a whole number' });
    }

    const cleanName = name.trim().substring(0, 20);

    try {
        const stmt = db.prepare('INSERT INTO scores (name, score) VALUES (?, ?)');
        const result = stmt.run(cleanName, score);

        res.status(201).json({
            message: 'Score saved successfully',
            id: result.lastInsertRowid,
            name: cleanName,
            score: score
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Failed to save score' });
    }
});
router.get('/', (req, res) => {
    try {
        const scores = db.prepare(
            'SELECT id, name, score, created_at FROM scores ORDER BY score DESC, created_at ASC LIMIT 10'
        ).all();

        res.json(scores);

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Failed to retrieve scores' });
    }
});

module.exports = router;
