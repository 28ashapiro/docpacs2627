const express = require('express');
const path = require('path');

const parama = express.Router()

parama.get('/query', (req, res) => {
    const message = req.query.message;
    if (typeof message !== 'string' || message.trim() === '') {
        res.status(400).sendFile(path.join(__dirname, '../public/badReqError'))
    } else {
        res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 id="queryRes" class='element'>Your message: ${message}</h1>
</body>

</html>`);
    };

});

parama.get('/urlparams/:paramname', (req, res) => {
    const param = req.params.paramname;
    if (!param || param.trim() === '') {
        res.status(400).sendFile(path.join(__dirname, '../public/badReqError'));
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

module.exports = parama;