require('dotenv').config();
let express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;
const appName = process.env.APP_NAME;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>Form Page</h1>
        <p>A form for creating project admission applications.
        <a href="/form">Form Page</a>
        `);
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/form', (req, res) => { //Form data from req.body
    const studentName = req.body.studentName;
    if (studentName === undefined) {
        res.status(400).send("You must provide a valid name! The current value is either missing or blank!");
    } else {
        const trimmedName = studentName.trim();
        if (trimmedName === null || trimmedName === "") {
            res.status(400).send("You must provide a valid name! The current value is either missing or blank!");
        } else {
            res.send(`<p>Student Name: ${trimmedName}</p>`);
        }
    }
});

app.get('/query', (req, res) => { //Query string from req.query
    const message = req.query.message;
    if (message === null || message === "" || message === undefined) {
        res.status(400).send("Please provide a message parameter. Example: /query?message=YourMessage");
    } else {
        const trimmedMessage = message.trim();
        if (trimmedMessage === null || trimmedMessage === "") {
            res.status(400).send("Please provide a message parameter. Example: /query?message=YourMessage");
        } else {
            res.send(`<p>Your message is: ${trimmedMessage}</p>`);
        }
    }
});

app.get('/urlparams/:paramname', (req, res) => { //URL segment from req.params
    const parameter = req.params.paramname;
    const trimmedParameter = parameter.trim();
    if (trimmedParameter === null || trimmedParameter === "") {
        res.status(400).send("Please provide a URL parameter. Example: '/urlparams/ ' <- your URL parameters go after this bit.");
    } else {
        res.send(`<p>Your query parameters are: ${trimmedParameter}</p>`);
    }
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, that file doesn't exist!");
});

app.listen(port, () => {
    console.log("APP_NAME is " + appName);
    console.log("PORT is " + port);
    console.log("URL is localhost:" + port);
});