const dotenv = require('dotenv')
const readline = require('node:readline');
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    console.log(`recieved ${method} to ${url}`)
    if (req.url == '/pages/form.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('pages/form.html', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log()
            res.end(data);
        });
    } else if (req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>local server!</h1>')
    res.write('This is a Node.js application running on the local host, and listening to a set port. (localhost:3000)')
    res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Error 404: Page Not Found');
    }
});
dotenv.config();
const PORT = process.env.PORT
server.listen(PORT, 'localhost', () => {
    console.log(`server running at http://localhost:${PORT}/`)
});