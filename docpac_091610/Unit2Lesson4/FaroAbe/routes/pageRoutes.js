const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('<h1>My Heading</h1><p>Some text</p><a href="/form">Go to Form</a>');
});

module.exports = router;
