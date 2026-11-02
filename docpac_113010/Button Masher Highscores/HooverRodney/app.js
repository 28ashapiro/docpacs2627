let express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const db = require('./database.js')

app.use(express.static('public'));
app.use(express.json());

app.post('/api/scores', (req, res) => {
    const name = req.body.name ? req.body.name.trim() : "";
    const score = req.body.score;
    if (!name || name == "" || name.length > 20 || typeof score !== "number" || score <= 0 || !Number.isInteger(score)) {
        res.status(400).json({ error: "400 Bad Request" });
    } else {
        const sql = "INSERT INTO scores (name, score) VALUES (?, ?)"
        db.run(sql, [name, score], function (err) {
            if (err) {
                if (err) {
                    console.log("Database error:", err.message);  // Add this line
                    res.status(500).json({ error: "500 Internal Server Error" });
                }
            } else {
                res.json({
                    message: "Score saved successfully",
                    id: this.lastID
                });
            }
        })
    }
});

app.get('/api/scores', (req, res) => {
    const sql = "SELECT * FROM scores ORDER BY score DESC, id ASC LIMIT 10";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log("Database error:", err.message);  // Add this line
            res.status(500).json({ error: "500 Internal Server Error" });
        } else {
            res.json(rows);
        }
    })
});

app.listen(PORT, () => {

});