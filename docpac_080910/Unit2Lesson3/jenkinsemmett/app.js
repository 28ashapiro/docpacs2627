//Application Setup
const dotenv = require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path')
const logger = require('./utils/requestLogger')
let file = 0
const app = express();

//Middleware
app.use(express.static('public'));
//Utility Function
app.use(logger)


//Route Handlers
var server = app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

app.get('/', (req, res) => {
  //Form or request body
  res.status(200).sendFile(path.join(__dirname, './public/home.html'));
});

app.get('/form', (req, res) => {
  //Form or request body
  res.status(200).sendFile(path.join(__dirname, './public/form.html'));
});

app.post('/form', (req, res) => {
  //Form or request body
  let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const query  = querystring.parse(body);
        //console.log(query);
        if (query.name.trim() && query.mail.trim() && query.size && query.projectChoice && query.techChoice && query.difficult && query.description.trim() && query.description.trim() != '--Place Description Here--' && query.contactChoice){
          res.status(200).send(`Hello, ${query.name}`);
        } else {
          res.status(400).send('There Is Missing Required Data From The Form, All Areas Must Have At Least One Selection, And Text Boxes Cannot Be Blank');
        }
    });
});

app.get('/query', (req, res) => {
  //Query String
  const urlPart = url.parse(req.url, true);
  if (urlPart.search){
    if (urlPart.search.includes("?message=Hello")){
      res.status(200).send('Hi!');
    } else {
      res.status(400).send('No Content Available For This Message');
    }
  } else {
    res.status(400).send('No Content Available Without Message');
  }
});

app.get('/urlParams/:paramName', (req, res) => {
  //Dynamic URL segments
  const param = req.params.paramName
  if (param){
    res.status(200).send(`Welcome To The Parameter: ${param}`)
  } else {
    res.status(400).send('No Content Available Without Parameter');
  }
});

app.use(function(req, res) {
  //When All Else Fails
  res.status(404).send('Error, Page Not Found!');
});

//Utility Function
console.log('This is the ' + process.env.NAME + ' program');
console.log('This program is running on port: ' + process.env.PORT);
console.log('This program is being used by ' + process.env.USER);

console.log();

const hello = ["World", "Mr. Smith", "Node.JS"];
for (let run = 0; run < hello.length; run++) { console.log("Hello " + hello[run]); }
console.log(1);
console.log("4 * 9 =");
console.log(4*9);