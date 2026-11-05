const express = require('express');
const router = express.Router();


router.get('/query', (req, res) => {
    const message = req.query.message;

    if (!message || typeof message !== 'string') {
        return res.status(400).send('<h1>Error</h1><p>Message is required and must be text.</p>');
    }

    const trimmedName2 = message.trim();

    if (trimmedName2 === '') {
        return res.status(400).send('<h1>Error</h1><p>Message cannot be blank.</p>');
    }

    res.send(`<h1>Query Received</h1><p>Message: ${trimmedName2}</p>`);
});


router.get('/urlparams/:paramname', (req, res) => {
    const paramValue = req.params.paramname;

    if (!paramValue || typeof paramValue !== 'string') {
        return res.status(400).send('<h1>Error</h1><p>Message is required and must be text.</p>');
    }

    const trimmedName3 = paramValue.trim();

    if (trimmedName3 === '') {
        return res.status(400).send('<h1>Error</h1><p>Value cannot be blank.</p>');
    }

    res.send(`<h1>Value Received</h1><p>Message: ${trimmedName3}</p>`);
});

module.exports = router;
