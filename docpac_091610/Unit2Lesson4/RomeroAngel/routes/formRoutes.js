const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});

router.post('/form', (req, res) => {
    let userName = req.body.userName;
    let trimmedName = userName.trim();

    if (trimmedName === "") {
        res.status(400).send('Error 400! There should be no blanks in the name field. Please make sure you fill out the "Your Name Please!" with a name. Please add a name and submit again.');

    }
    else {
        console.log('Route was hit!');
        console.log(req.body);
        res.send(`<h1>Thank you, ${req.body.userName}!</h1><p>We will now process and do our stuff to get this filled or something, so sit back, relax. Grab some snacks, and well jump right to it! bye bye!</p>`);
    }
});

module.exports = router;