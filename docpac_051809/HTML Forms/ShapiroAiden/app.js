const dotenv = require('dotenv')
const http = require('http')
const fs = require('fs')
dotenv.config()
const APP_NAME = process.env.APP_NAME
const PORT = process.env.PORT
const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    console.log(`received ${method} to ${url}`)
    if (method == 'GET' && url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(`<h1>${APP_NAME}</h1>`)
        res.write('This is a Node.js application running on the local host.')
        res.end()
    } else if (method == 'GET' && url == '/form' || method == 'GET' && url == '/form.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('pages/form.html', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                res.end('Error loading form')
                return
            }
            res.end(data)
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('Error 404: Page Not Found')
    }
})
server.listen(PORT, 'localhost', () => {
    console.log(`server running at http://localhost:${PORT}/`)
})