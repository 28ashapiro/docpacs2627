const fs = require('fs');
require('dotenv').config();
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);
    const parsedUrl = new URL(req.url, `http://localhost:${3000}`);

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
        let rawBody = ''
        req.on('data', (chunk) => { rawBody += chunk; })
        req.on('end', () => {
            console.log(rawBody)
            const params = new URLSearchParams(rawBody);
            const studentName = params.get('studentName');
            if (studentName && studentName.trim() !== '') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(studentName);
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request')
            }
        });
    } else if (req.url.startsWith('/urlparams/') && req.method == 'GET') {
        const paramValue = req.url.substring(11);
        if (paramValue && paramValue.trim() !== '') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(paramValue);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Please provide a parameter value.');
        }
    } else if (parsedUrl.pathname == '/query' && req.method == 'GET') {
        const message = parsedUrl.searchParams.get('message');
        if (message != null) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Message:' + message);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Please provide a message parameter. Example: /query?message=Hello');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});
server.listen(process.env.PORT, 'localhost', () => {
    console.log(`${process.env.APP_NAME} is running at http://localhost:${process.env.PORT}/`);
});