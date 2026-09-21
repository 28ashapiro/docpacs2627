const dotenv = require('dotenv')
const http = require('http')
const fs = require('fs')
const { URL } = require('node:url')
dotenv.config()
const PORT = process.env.PORT
const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    console.log(`received ${method} to ${url}`)
    const requestURL = new URL(req.url, `http://localhost:${PORT}`)
    if (method == 'GET' && requestURL.pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<h1>local server! :)</h1>')
        res.end('this is a Node.js application running on the local host, and listening to a set port. (localhost:3000)')
    }
    else if (method == 'GET' && requestURL.pathname == '/form') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('pages/form.html', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                res.writeHead(500)
                res.end('error 500: error loading form :((')
                return
            }
            res.end(data)
        })
    }
    else if (method == 'POST' && requestURL.pathname == '/form') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            console.log(body)
            const params = new URLSearchParams(body)
            const text = params.get('text')
            if (!text || text.trim() == '') {
                res.writeHead(400, { 'Content-Type': 'text/plain' })
                res.end('error 400: please enter some text!!')
                return
            }
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(`<h1>you said: ${text} :)</h1>`)
        })
    }
    else if (method == 'GET' && requestURL.pathname == '/query') {
        const message = requestURL.searchParams.get('message')
        if (!message || message.trim() == '') {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            res.end('error 400: please provide a message!!! :((')
            return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`<h1>your message: ${message}</h1>`)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('error 404: page not found :((')
    }
})
server.listen(PORT, 'localhost', () => {
    console.log(`server running at http://localhost:${PORT}/`)
})