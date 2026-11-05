const express = require('express');
const requestLogger = require('./utils/requestLogger.js');
//Hi! So from here to...
const formRouter = require('./routes/formRoutes');
const parameterRouter = require('./routes/parametersRoutes');
const pageRouter = require('./routes/pageRoutes');
//... here we can see that these other js files can be seen as our controllers in terms of MVC as they handle the GET and POST 
// and are what we use to handle submitted forms and the if else these forms need in order to send valid responses
const path = require('path');
const { get } = require('http');
const app = express();
require('dotenv').config();
console.log(process.env.PORT);
console.log(process.env.APP_NAME)
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(express.static('public'));
app.use(formRouter);
app.use(parameterRouter);
app.use(pageRouter);

app.use((req, res) => {
    res.status(404).send('404 Page not found');
});


app.listen(port, () => {
    console.log(`${process.env.APP_NAME} is running on http://localhost:${port}`);
});

console.log("Hi again");
console.log("1990");
console.log("5 * 2 = 10");
console.log("Score = 100");
console.log("Hello World");