require('dotenv').config()
fs = require('fs')
http = require('http')

const PORT = process.env.PORT




server = http.createServer((req, res) => {
    

    if (req.url == "/form") {
        fs.readFile("pages/form.html", "UTF8", (error, data) => {
            
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.end("uh oh")
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(data)
            }
        })
    } else if(req.url == "/"){
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end("Hello World")
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end("URL not found!")
    }
    console.log("request for " + req.url)
    //res.end(data)
});

server.listen(PORT, 'localhost', () => {
    console.log("running at " + PORT)
})