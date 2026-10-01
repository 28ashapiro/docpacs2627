require('dotenv').config();
let http = require('http');
let fs = require('fs');

const port = process.env.PORT;
const appName = process.env.APP_NAME;

const server = http.createServer(function (req, res) {
    console.log("req.method is " + req.method);
    console.log("The requested URL is " + req.url);
    const url = new URL(req.url, 'http://localhost:3000');
    if (req.url == '/') { //these if statements are the endpoints
        res.writeHead(200, { 'Content-Type': 'text/plain' }); //'Content-Type': 'text/plain' means the HTTP header is telling the browser it's sending unformatted text
        res.end("app name is '" + appName + "'");
    } else if (req.method == 'GET' && url.pathname == '/form') {
        fs.readFile('pages/form.html', function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("The route exists, but something went wrong on the server side.");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' }); //response code 200 means OK
                res.end(data);
            }
        });
    } else if (req.method == 'POST' && url.pathname == '/form') {
        let body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            const params = new URLSearchParams(body); //apparently this is what parsing is
            const studentName = params.get('studentName');
            const trimmedName = studentName.trim();
            if (!trimmedName || trimmedName === "") {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("You must provide a valid name!");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("Student Name is: " + trimmedName);
                console.log(trimmedName);
            }
        });
    } else if (req.method == 'GET' && url.pathname === '/query') {
        const message = url.searchParams.get('message');
        if (message == null) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end("Please provide a message parameter: /query?message=YourMessage");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Your message is: " + message);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("The requested page was not found.");
    }
});

server.listen(port, () => {
    console.log("APP_NAME is " + appName);
    console.log("PORT is " + port);
    console.log("URL is localhost:" + port);
});

//last step says to add input validation