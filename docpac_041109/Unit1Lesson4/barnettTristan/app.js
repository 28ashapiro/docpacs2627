const http = require('http');
require('dotenv').config()
const fs = require('fs');
const PORT = Number(process.env.PORT);

const server = http.createServer((req,res) => {
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("hello world!\n");
        
    }
    if (req.url == '/form') {
            if (req.method === "POST") {
                let body = ''

            }
            if (req.method === "GET") {
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

});

server.listen(PORT, 'localhost', () => {
    console.log(`server running at http://localhost:${PORT}/`);
})