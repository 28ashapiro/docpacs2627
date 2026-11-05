
// require
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// app
const app = express();


// routes and util
const requestLogger = require('./utils/requestLogger');
const formRouter = require('./routes/formRoutes');
const pageRouter = require('./routes/pageRoutes');
const paramRouter = require('./routes/parameterRoutes');

dotenv.config();

const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// middleware
app.use(requestLogger);

// controller logic
app.use(pageRouter)
app.use(formRouter)
app.use(paramRouter)


//404 error!! !
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

// start server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`running here dude: http://localhost:${PORT}`);
});