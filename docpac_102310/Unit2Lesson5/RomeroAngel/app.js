const express = require('express');
const requestLogger = require('./utils/requestLogger.js');
//Hi! So from here to...
const formRouter = require('./routes/formRoutes');
const parameterRouter = require('./routes/parametersRoutes');
const pageRouter = require('./routes/pageRoutes');
//... here we can see that these other js files can be seen as our controllers in terms of MVC as they handle the GET and POST 
// and are what we use to handle submitted forms and the if else these forms need in order to send valid responses
const path = require('path');

const app = express();
app.set("views", path.join(__dirname, "views"));
// Set EJS as view engine
app.set('view engine', 'ejs');
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


app.get("/ejs-demo", (req, res) => {
    res.render("index", {
        title: "My Goofy Silly Page",
        appName: "ExpressinStuff",
        message: "Welcome!",
        whatIshoulddo: "DO MY WORK!",
        howthepageis: "yeah, its a lesson"
    });
});


app.use((req, res) => {
    res.status(404).render('error', {
        title: "404 Error!",
        message: "You got a 404 error",
        statusCode: 404,
        Linksandstuff: [

            {
                text: "This Goes To The Form",
                url: "/form",
                description: "This button will go to the form page"
            },

            {
                text: "This Link Takes You Back To A Valid Page!!!",
                url: "/ejs-demo",
                description: "This is for our EJS lesson!"
            },


            {
                text: "This Goes To The UrlParams Example",
                url: "/urlparams/Example",
                description: "Here is a valid use of urlparams"
            },

            {
                text: "This Goes To The A Query String Example",
                url: "/query?message=Example",
                description: "Here is a valid use of UrlParams"
            }
        ]
    });
});


app.listen(port, () => {
    console.log(`${process.env.APP_NAME} is running on http://localhost:${port}`);
});

console.log("Hi again");
console.log("1990");
console.log("5 * 2 = 10");
console.log("Score = 100");
console.log("Hello World");