const express = require('express')
const path = require('path')

const pageRouter = express.Router();
// page
pageRouter.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/style.css">
            <script src="/js/client.js"></script>
        </head>
        <body>
            <header id="header">
                <h1>Index</h1>
            </header>
            <p>Replacing Node HTTP with Express.</p>
            <a href="/form">form.html</a>
        </body>
        </html>
    `);
    console.log('-----------INDEX----------') 
});
module.exports = pageRouter;