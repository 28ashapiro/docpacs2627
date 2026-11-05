const express = require('express')
const path = require('path')

const formRouter = express.Router();
//GETTT!!!
formRouter.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'form.html'));
});

//POST!!!!
formRouter.post('/form', (req, res) => {
    const text = req.body.text;
    if (typeof text !== 'string' || text.trim() === '') {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <h1>please submit something in the text box!!!</h1>
                <a href="/form">go back</a>
            </body>
            </html>
        `);
    }
    console.log('|', new Date().toLocaleString(), '|', 'FORM-RESULT:', text.trim());
    res.send(`
        <link rel="stylesheet" href="/css/style.css">
        <p>submitted text: ${text.trim()}</p>
        <a href="/form">back to form</a>
    `);
});
module.exports = formRouter;