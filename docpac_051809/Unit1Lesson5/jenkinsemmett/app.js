const dotenv = require('dotenv').config();
const querystring = require('querystring');
const http = require('http');
const fs = require('fs');
const url = require('url');
let urlPart = 0;
let file = 0

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  urlPart = url.parse(req.url, true);
  if (req.method == "GET" && urlPart.pathname == '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`This is the ${process.env.NAME} Program`);
    res.end(' Hello, World!');
  } else if (req.method == "GET" && urlPart.pathname == '/form') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    file = fs.readFileSync('./pages/form.html','utf8')
    res.end(file);
  } else if (req.method == "POST" && urlPart.pathname == '/form') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const query  = querystring.parse(body);
        console.log(query);
        if (query.name.trim() && query.mail.trim() && query.size && query.projectChoice && query.techChoice && query.difficult && query.description.trim() && query.description.trim() != '--Place Description Here--' && query.contactChoice){
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`Hello, ${query.name}`);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('There Is Missing Required Data From The Form, All Areas Must Have At Least One Selection, And Text Boxes Cannot Be Blank');
        }
    });
  } else if (req.method == "GET" && urlPart.pathname == '/query') {
    if (urlPart.search){
      if (urlPart.search.includes("?message=Hello")){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hi!');
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('No Content Available For This Message');
    }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('No Content Available Without Message');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Error, Page Not Found!');
  }
});
server.listen(process.env.PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

console.log('This is the ' + process.env.NAME + ' program');
console.log('This program is running on port: ' + process.env.PORT);
console.log('This program is being used by ' + process.env.USER);

console.log();

const hello = ["World", "Mr. Smith", "Node.JS"];
for (let run = 0; run < hello.length; run++) { console.log("Hello " + hello[run]); }
console.log(1);
console.log("4 * 9 =");
console.log(4*9);