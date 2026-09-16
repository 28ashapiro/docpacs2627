const dotenv = require('dotenv').config();
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  if (req.method == "GET" && req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`This is the ${process.env.NAME} Program`);
    res.end(' Hello, World!');
  } else if (req.method == "GET" && req.url == '/form') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const file = fs.readFileSync('./pages/form.html','utf8')
    res.end(file);
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