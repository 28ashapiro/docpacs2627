require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const appName = process.env.APP_NAME;
const app = express();
const path = require('path');
const requestLogger = require('./utils/requestLogger.js');

app.use(requestLogger);

app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, './public/form.html'));
});

app.post('/form', (req, res) => {
    const submission = req.body.input;

    if (!submission || submission.trim === '') {
        res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'> 400 ERROR: PLEASE USE CORRECT FORMAT OR ENTER A VALID SUBMISSION</h1>
</body>

</html>`);
    } else {
        console.log('Submission recieved!');
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'> You answered: ${submission}! :D </h1>
</body>

</html>`);

    };

});

app.get('/query', (req, res) => {
    const message = req.query.message;

    if (typeof message !== 'string' || message.trim() === '') {
        res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'> 400 ERROR: PLEASE USE CORRECT FORMAT OR ENTER A VALID SUBMISSION | /query?message=YOUR%20MESSAGE</h1>
</body>

</html>`);
    } else {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'>Your message: ${message}</h1>
</body>

</html>`);
    };

});

app.get('/urlparams/:paramname', (req, res) => {
    const param = req.params.paramname;
    if (!param || param.trim() === '') {
        res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'> 400 ERROR: PLEASE USE CORRECT FORMAT OR ENTER A VALID SUBMISSION</h1>
</body>

</html>`);
    } else {
        res.send(`
            
            <!DOCTYPE html>
        <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'>${param}</h1>
</body>

</html>`);
    };

});

app.all(('/*splat'), (req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'>404 ERROR: PAGE NOT FOUND :/</h1>>
</body>

</html>`);
});

app.listen(port, () => {
    console.log(`${appName} is running at port ${port}`);
    console.log(`URL: http://localhost:${port}`);
});