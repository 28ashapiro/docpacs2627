const express = require('express');
const router = express.Router();

router.get('/query', (req, res) => {
    if (!req.query.message || req.query.message.trim() === "") {
        res.status(400).send('Please provide a message');
    } else {
        res.send(`Your message is: ${req.query.message.trim()}`);
    }
});

router.get('/urlparams/:paramname', (req, res) => {
    if (!req.params.paramname || req.params.paramname.trim() === "") {
        res.status(400).send("You must send a valid parameter");
    } else {

        res.send(`The value of paramname is: ${req.params.paramname.trim()}`);
    }
});

module.exports = router;
