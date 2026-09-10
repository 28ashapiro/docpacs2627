const http = require("node:http");
const fs = require("node:fs");
require("dotenv").config();

const server = http.createServer((req, res) => {
    console.log(`${req.method} method at ${req.url}`);

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Connected to ${process.env.APP_NAME}`);
    }
    else if (req.method === "GET" && req.url === "/form") {
        const formPage = fs.readFileSync("pages/form.html");
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(formPage);
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("The requested page was not found.");
    }
});

server.listen(process.env.PORT, () => {
    console.log(`"${process.env.APP_NAME}" started on port ${process.env.PORT}`);
});