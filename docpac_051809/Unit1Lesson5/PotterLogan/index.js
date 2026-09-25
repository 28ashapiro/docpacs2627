require('dotenv').config()
fs = require('fs')
http = require('http')
url = require('url')
const PORT = process.env.PORT




server = http.createServer((req, res) => {

    let parsed = url.parse(req.url, true)

    if (req.url == "/form") {

        if (req.method == "GET") {
            fs.readFile("pages/form.html", "UTF8", (error, data) => {

                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/html' })
                    res.end("uh oh")
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                }
            })
        } else if (req.method == "POST") {
            let body
            req.on("data", (chunk) => {
                body += "&"
                body += chunk

            })
            req.on("end", () => {
                console.log(body.toString("UTF8"))
                console.log(body.slice(10))
                body = new URLSearchParams(body)
                console.log(body.get("name"))

                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end("your name is " + body.get("name"))
            })
        }
    } else if (req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end("Hello World")
    } else if (parsed.pathname == "/query") {
        if (parsed.query.message != null) {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end("Your message was", parsed.query.message)
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end("make sure your message is in the format of: website/query?message=yourmessagehere")
            console.log("parsed.query value:", parsed.query, "parsed.query.message value:", parsed.query.message)
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end("URL not found!")
    }
    console.log("request for " + req.url)
    //res.end
});

server.listen(PORT, 'localhost', () => {
    console.log("running at " + PORT)

})