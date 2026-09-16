require('dotenv').config();
let http = require('http');
let fs = require('fs');

const port = process.env.PORT;
const appName = process.env.APP_NAME;

const server = http.createServer(function (req, res) {
    console.log("req.method is " + req.method);
    console.log("The requested URL is " + req.url);
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' }); //'Content-Type': 'text/plain' means the HTTP header is telling the browser it's sending unformatted text
        res.end("app name is '" + appName + "'");
    } else if (req.url == '/form') {
        fs.readFile('pages/form.html', function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("The route exists, but something went wrong on the server side.");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' }); //'Content-Type': 'text/plain' means the HTTP header is telling the browser it's sending unformatted text
                res.end(data);
            }
        });
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