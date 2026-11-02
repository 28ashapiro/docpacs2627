const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const scoreRoutes = require('./routes/scoreRoutes');

app.use(express.static('public'));
app.use(express.json());
app.use('/api/scores', scoreRoutes);
app.use((req, res) => {
    res.status(404).send('Not Found');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

