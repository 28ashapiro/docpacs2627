require('dotenv').config();
const http = require('http');
const port = process.env.PORT;
const appName = process.env.APP_NAME;
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url)
    console.log(req.method)

    if (req.url === '/' & req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Homepage of my first ${appName}`);
    }
    else if (req.url === '/form' & req.method === 'GET') {
        fs.readFile('./pages/form.html', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 Error: Unable to load form :(');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        })
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Error: Page not found :/')
    }
}) 

server.listen(port, () => {
    console.log(`Server listening at port ${port}`)
    console.log(`URL: http://localhost:${port}`)
})