const dotenv = require("dotenv").config();
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT;

const FORM = fs.readFileSync("pages/form.html");

const server = http.createServer(function (request, response) {
    requestedURL = request.url;
    console.log("Request for " + request.url);
    if (requestedURL == "/") {
        response.writeHead(200, "Good Status");
        response.end("Root file. Go to /form");
    } else if (requestedURL == "/form") {
        response.writeHead(200, "Good Status");
        response.end(FORM);
    } else {
        response.writeHead(404, "Page does not exist");
        response.end("Invalid URL.");
    };
});

server.listen(PORT, "localhost", function () {
    console.log(`Running on ${PORT}`);
});