const dotenv = require("dotenv").config();
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.static("public"))

const PORT = process.env.PORT;
const APP = process.env.APP_NAME;
const LocalURL = "localhost"

console.log("PORT:",PORT)
console.log("App Name:", APP)
console.log("Local URL:",LocalURL)

app.get("/", (request, response) => {})

app.listen(PORT,LocalURL)

/*
const FORM = fs.readFileSync("pages/form.html");

const server = http.createServer(function (request, response) {
    requestedURL = request.url;
    host = request.headers.host;
    parsed = new URL(requestedURL, `http://${host}`)
    searchParams = parsed.searchParams

    if (parsed.pathname == "/") {
        response.writeHead(200, "Good Status");
        response.end("Root file. Go to /form");
    } else if (parsed.pathname == "/form") {
        
        if (request.method == "POST") {
            data = ""
            request.on("data", chunk => {
                data += chunk
            })
            request.on("end", () => {
                searchParams = new URLSearchParams(data)
                processData(searchParams,response)
            })
        } else if (request.method == "GET") {
            response.writeHead(200, "Good Status");
            response.end(FORM);
        } else {
            response.writeHead(404, "Unknown request method");
            response.end("Unknown request method");
        }

    } else if (parsed.pathname == "/query") {
        processData(searchParams,response)
    } else {
        response.writeHead(404, "Page does not exist");
        response.end("Invalid URL.");
    };
});

server.listen(PORT, "localhost", function () {
    console.log(`Running on ${PORT}`);
});

function processData(searchParams,response) {
    if (searchParams.get("message").trim() != '' && searchParams.get("message") != null) {
        console.log(searchParams)
        response.end(`Recieved: ${searchParams.get("message")}`);
    } else {
        response.writeHead(400,"Invalid or missing input.")
        response.end("Recieved an invalid input.");
    }
}
*/