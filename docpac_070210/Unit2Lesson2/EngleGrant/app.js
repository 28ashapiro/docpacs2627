const { error } = require("console");
const express = require("express");
const path = require("path");
const env = require("dotenv").config();

const app = express();

app.use(express.static("public")) // Only allow external access to the files located in /public.
app.use(express.json()); // Middleware that processes json strings into accessable objects.
app.use(express.urlencoded({ extended: true })); // Processes url encoded.

const PORT = process.env.PORT;

const options = {
    root: path.join(__dirname)
}

app.get("/",(req, res) => { 
    res.sendFile("public/index.html", options, (err) => {console.log(err)})
});

app.get("/form",(req, res) => {
    res.sendFile("public/form.html", options, (err) => {console.log(err)})
});

app.get("/query",(req,res) => { 
    data = req.query; // Uses request data query because of the lack of need for security and length not being an issue.

    message = data.message;

    if (!message) {
        res.status(400)
        res.end("Input invalid. Ensure you have typed a message in before submitting.");
        return;
    };

    res.send(data);
})

app.get("/urlparams",(req,res) => {
    res.end("Add a parameter to the URL to return it.");
});

app.get("/urlparams/:param",(req,res) => { // : makes the route of the path a variable that can be used in script for dynamic routes, an example being different user pages like how formbar does it.
    res.end(`Inputted parameter: ${req.params.param}`);
    res.send();
});

app.post("/form",(req,res) => { 
    data = req.body; // Uses the request data body due to increased security on https servers and infinite length, useful for forms.

    username = data.username;
    password = data.password;

    if (
        !validate(username) ||
        !validate(password,0,5)
    ) {
        res.status(400)
        res.end("Input invalid. Ensure all fields have been filled in correctly before submitting.");
        return;
    };

    res.send(data);
});

app.use("",(req,res) => {
    res.status(404)
    res.end("No resource found.")
});

function validate(input,minLength=0,maxLength=0) { // returns true if valid.
    if (!input || input == "") {
        return false;
    } else {
        if (minLength == 0 && maxLength == 0) {
            return true;
        } else {
            if (input.length >= minLength && input.length <= maxLength) {
                return true;
            };
        };
    };
};

app.listen(PORT,"localhost", () => {
    console.log(`listening on port ${PORT}`)
});