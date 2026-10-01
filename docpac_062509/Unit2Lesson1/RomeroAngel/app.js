const express = require('express');
const { get } = require('http');
const app = express();
const path = require('path');
require('dotenv').config();
console.log(process.env.PORT);
console.log(process.env.APP_NAME)
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`<h1>Go to the form and fill it out</h1><p>The form is where you put you interest at and answer questions</p><a href="/form.html">Fill out the form</a>`);
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

///This is the req body, this object is considered as our backend all values and data you submit is seen here as a HTTP payload.
app.post('/form', (req, res) => {

    let userName = req.body.userName;
    let trimmedName = userName.trim();

    if (trimmedName === "") {
        res.status(400).send('Error 400! There should be no blanks in the name field. Please make sure you fill out the "Your Name Please!" with a name. Please add a name and submit again.');

    }
    else {
        console.log('Route was hit!');
        console.log(req.body);
        res.send(`<h1>Thank you, ${req.body.userName}!</h1><p>We will now process and do our stuff to get this filled or something, bye bye!</p>`);
    }
});

//// req.body is what sends data to the request body, this is were that data stored then the route handler values are sent using th said req.body. This is for the HTTP request.
app.get('/query', function (req, res) {
    if (!req.query.message || req.query.message.trim() === "") {
        res.status(400).send('Please provide a message');
    } else {
        res.send(`Your message is: ${req.query.message.trim()}`);
    }
});

///This is the object containing query parameters that the URL would use for any incoming HTTP request.
app.get('/urlparams/:paramname', (req, res) => {
    if (!req.params.paramname || req.params.paramname.trim() === "") {
        res.status(400).send("You must send a valid parameter");
    } else {

        res.send(`The value of paramname is: ${req.params.paramname.trim()}`);
    }
});

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