const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('request received:', req.method, req.url);
    next();
});

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
    console.log('form response:', text);
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
    res.send(`
        <link rel="stylesheet" href="/css/style.css">
        <p>submitted text: ${text.trim()}</p>
        <a href="/form">back to form</a>
    `);
});

app.get('/query', (req, res) => {
    const message = req.query.message;
    if (typeof message !== 'string' || message.trim() === '') {
        return res.status(400).send(
            'error 400: please use the URL format: example: /query?message=Hello'
        );
    }
    res.send('query: ' + message.trim());
});

app.get('/urlparams/:paramname', (req, res) => {
    const paramname = req.params.paramname;
    if (typeof paramname !== 'string' || paramname.trim() === '') {
        return res.status(400).send('invalid URL parameter.');
    }
    res.send('url parameter: ' + paramname);
});

app.use((req, res) => {
    res.status(404).send('404 - page not found');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`server running on http://localhost:${PORT}`);
});