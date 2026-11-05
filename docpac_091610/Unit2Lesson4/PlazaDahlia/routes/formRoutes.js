const express = require('express')
const router = express.Router();
const path = require('path')
router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});
router.post('/form', (req, res) => {
    const name = req.body.studentName?.trim();
    if (!name) {
        res.status(400).send('Invalid Name');
    } else {
        res.status(200).send(`Thanks, ${name}!`);
    }
});
module.exports = router;