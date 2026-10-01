const fs = require('fs');
require('dotenv').config();
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('testing\n');
    } else if (req.url === '/form' && req.method == 'GET') {
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
    else if (req.url === '/form' && req.method == 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        let rawBody = ''
        req.on('data', (chunk) => { rawBody += chunk; })
        req.on('end', () => {
            const params = new URLSearchParams(rawBody);
            const studentName = params.get('studentName');
            res.end(studentName);
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(process.env.PORT, 'localhost', () => {
    console.log(`${process.env.APP_NAME} is running at http://localhost:${process.env.PORT}/`);
});