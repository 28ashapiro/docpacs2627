const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const dotenv = require('dotenv');
dotenv.config()
const fs = require('fs')

const http = require('http');
const { text } = require('stream/consumers');
const server = http.createServer((req, res) => {
    if (req.url === '/form') {
        if (req.method === 'POST') {
            console.log ('received POST')
            let body = '';

            req.on('data', (chunk) => {
                console.log ('received Chunk')
                 body = body + chunk
            });

            req.on('end', () => {
                console.log ('received end')
                console.log(body)
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end(body)
            });
        }
        if (req.method === 'GET') {

                    fs.readFile('pages/form.html', 'utf8', (err, data) => {
            if (err) {

                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('Error reading file')
            } else {
                res.writeHead(200, { 'content-type': 'text/html' })
                res.end(data)
            } 
        })
        }
    }  
}
);

server.listen(process.env.PORT, () => {
    console.log(process.env.APP)
    console.log(process.env.PORT)
    console.log('http://localhost:', process.env.PORT)
});