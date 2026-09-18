require('dotenv').config()
const http = require('http')
const fs = require('fs')
const url = require('url')

const name = process.env.APP_NAME
const port = process.env.PORT
let formPage
fs.readFile('./pages/form.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file: ', err)
        return
    }
    formPage = data
})

http.createServer((req, res) => {
    console.log(`URL: ${req.url}`, `Method: ${req.method}`, `Listening on port: ${port}`)
    let parsed = url.parse(req.url, true)
    console.log(parsed.pathname)
    if (req.method == 'GET') {
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.write('Plain text response')
            res.end()
        }
        else if (req.url == '/form') {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(formPage)
            res.end()
        }
        else if (parsed.pathname == '/query') {
            if (parsed.pathname && parsed.pathname.length) {
                if (parsed.query.message) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' })
                    res.write(`Your message was ${parsed.query.message}`)
                    res.end()
                }
                else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' })
                    res.write('Please enter your message as ip/query?message=x')
                    res.end()
                }
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.write('The requested page was not found')
            res.end()
        }
    }
    else if (req.method == 'POST') {
        if (req.url == '/form') {
            let body
            req.on('data', (chunk) => {
                body += '&'
                body += chunk
            })
            req.on('end', () => {
                console.log('end        end', body)
                body = body.trim()
                body = body.slice(10)
                console.log(body)
                body = new URLSearchParams(body)
                if (body && body.get('name')) {
                    console.log(body.get('name'))
                    res.writeHead(200, { 'Content-Type': 'text/plain' })
                    res.write(`Your name is ${body.get('name')}`)
                    res.end()
                }
                else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' })
                    res.write(`Please submit the name form`)
                    res.end()
                }

            })
        }
    }
}).listen(port)