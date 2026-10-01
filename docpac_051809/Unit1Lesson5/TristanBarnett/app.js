const http = require('http');
require('dotenv').config()
const fs = require('fs');
const PORT = Number(process.env.PORT);
const {parse} = require('querystring');
let url = require('url');
const { basename } = require('path');
baseUrl = "http://localhost:5000"

const server = http.createServer((req,res) => {
    let qrl = new URL (req.url, baseUrl)
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("hello world!\n");
        
    }
    if (qrl.pathname == '/form') {
            if (req.method === "POST") {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () =>{
                    console.log(
                        parse(body)
                    );
                    res.end('data sent');
                });
                if (body == false || '') {
                    
                }
            }
            else if (req.method === "GET") {
                fs.readFile('pages/form.html', 'utf8', (err, data) => {
                    if (err) {
                        console.error("error reading file",err);
                        return;
                    }
                    res.write(data);
                })
            }
            else {
                res.writeHead(404, {  'Content-Type': 'text/plain'});
                res.end("Page not found\n");
            }
        
    }

    if (qrl.pathname == '/query') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if  (req.method === 'GET') {
            searchParams = qrl.searchParams.get('message')
            if (searchParams == '') {
                res.writeHead(400, {'Content-Type': 'text/plain'})
                res.end("the query is empty please put a value within the query")
            }
            else {
                res.end(searchParams);
            }
        }
    }
});

server.listen(PORT, 'localhost', () => {
    console.log(`server running at http://localhost:${PORT}/`);
})