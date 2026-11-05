const express = require('express');
const path = require('path');

const form = express.Router();

form.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'));
});

form.post('/form', (req, res) => {
    const submission = req.body.input;

    if (!submission || submission.trim === '') {
        res.status(400).sendFile(path.join(__dirname, '../public/badReqError.html'));
    } else {
        console.log('Submission recieved!');
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Vbucks!!1!~!!1</title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'> You answered: ${submission}</h1>
</body>

</html>`);

    };

});


module.exports = form;