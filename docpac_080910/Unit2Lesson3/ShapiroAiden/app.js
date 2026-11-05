const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const requestLogger = require('./utils/requestLogger');

dotenv.config();

const PORT = process.env.PORT;
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/', (req, res) => {
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
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/form', (req, res) => {
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

app.get('/query', (req, res) => {
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

app.get('/urlparams/:paramname', (req, res) => {
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
                <a href="/">go back</a>
            </body>
            </html>
        `);
    }   
    res.send('|', new Date().toLocaleString(), '| URL |', paramname);
});

app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>404 - page not found</h1>
            <a href="/">go back</a>
        </body>
        </html>
    `);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server started on http://localhost:${PORT}!`);
    console.log('_________________________');
});