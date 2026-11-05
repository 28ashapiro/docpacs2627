const express = require('express');
const path = require('path');

const paramRouter = express.Router();
// URL PARAMSS!!!!
paramRouter.get('/urlparams/:paramname', (req, res) => {
    const paramname = req.params.paramname;
    if (typeof paramname !== 'string' || paramname.trim() === '') {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <h1>error 400: invalid URL parameter!</h1>
                <h2>example: ../urlparams/:paramname</h2>
                <a href="/">go back</a>
            </body>
            </html>
        `);
    }
    res.send(`
        <link rel="stylesheet" href="/css/style.css">
        <p>param message: ${paramname.trim()}</p>
        <a href="/form">back to form</a>
        `);
});


// QUERYY!!!
paramRouter.get('/query', (req, res) => {
    const message = req.query.message;
    if (typeof message !== 'string' || message.trim() === '') {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <h1>error 400: please use the correct URL format!</h1>
                <h2>example: /query?message=Hello</h2>
                <a href="/form">go back</a>
            </body>
            </html>
        `);
    }
    res.send(`
        <link rel="stylesheet" href="/css/style.css">
        <p>query message: ${message.trim()}</p>
        <a href="/form">back to form</a>
        `);
});
module.exports = paramRouter;