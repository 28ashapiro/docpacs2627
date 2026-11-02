const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../data', 'scores.db');
const db = new Database(dbPath);


router.post('/', (req, res) => {
    const { name, score } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Name is required' });
    }

    if (typeof score !== 'number' || score < 0) {
        return res.status(400).json({ message: 'Invalid score' });
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
