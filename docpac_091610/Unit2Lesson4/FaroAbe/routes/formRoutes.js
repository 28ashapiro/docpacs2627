const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});


router.post('/form', (req, res) => {
    const studentName = req.body.studentName;

    if (!studentName || typeof studentName !== 'string') {
        return res.status(400).send('<h1>Error</h1><p>Name is required and must be text.</p>');
    }

    const trimmedName = studentName.trim();

    if (trimmedName === '') {
        return res.status(400).send('<h1>Error</h1><p>Name cannot be blank.</p>');
    }

    res.send(`<h1>Form Submitted!</h1><p>Name: ${trimmedName}</p>`);
});

module.exports = router;
