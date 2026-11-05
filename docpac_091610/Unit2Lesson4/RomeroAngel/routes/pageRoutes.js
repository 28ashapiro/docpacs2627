const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1>Go to the form and fill it out</h1><p>The form is where you put you interest at and answer questions</p><a href="/form.html">Fill out the form</a>`);
});

module.exports = router;
