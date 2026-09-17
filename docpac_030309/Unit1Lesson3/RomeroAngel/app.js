require('dotenv').config();
console.log(process.env.PORT);
console.log(process.env.APP_NAME)
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {


    if (req.url === '/' && req.method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.end('Welcome to the Home Page!');
    }
    else if (req.url === '/api/user' && req.method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ id: 1, name: 'John Doe' }));
    }

    else if (req.url === '/form' && req.method === 'GET') {
        fs.readFile('pages/form.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading form');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    else if (req.url === '/form' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const name = params.get('userName');

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Thank you, ${name}!</h1>`);
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

console.log("Hi again");
console.log("1990");
console.log("5 * 2 = 10");
console.log("Score = 100");
console.log("Hello World");