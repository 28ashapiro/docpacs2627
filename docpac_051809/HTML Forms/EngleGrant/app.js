const dotenv = require("dotenv").config();
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT;

const server = http.createServer(function (request, response) {
    requestedURL = request.url
    host = request.host
    parsed = new URL(requestedURL, `http://${host}`)

    console.log(request.method)
    console.log(request.url)

    if (parsed.pathname == "/") {
        fs.readFile("pages/form.html",function(error, data) {
            response.writeHead(200, "Good Status");
            response.end(data);
        })
    } else if (parsed.pathname == "/form") {
        if (request.method == "POST") {
            data = ""
            request.on('data', chunk => {
                data += chunk
            })
            request.on('end', () => {
                response.writeHead(200, "Data recieved");
                response.end(`Data recieved: ${data}`);
            })
        }
    } else {
            response.writeHead(400, "Page not found");
            response.end("Page not found");
    }
});

server.listen(PORT, "localhost", function () {
    console.log(`Running on ${PORT}`);
})