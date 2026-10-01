require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const name = process.env.APP_NAME
const port = process.env.PORT

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true,
    inflate: true,
    limit: "1mb",
    parameterLimit: 5000
}))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/homepage.html'))
})

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/form.html'))
})


//Accepting input from examining form request body data
app.post('/form', (req, res) => {
    if (req.body.name && typeof req.body.name == 'string' && req.body.name.trim()) {
        res.send(`Your name is: ${req.body.name}`)
    }
    else {
        res.status(400).send('Please enter a valid string into the input')
    }
})


//Accepting input from examining a query string
app.get('/query', (req, res) => {
    if (req.query.message && typeof req.query.message == 'string' && req.query.message.trim()) {
        res.send(`Your message was: ${req.query.message}`)
    }
    else {
        res.status(400).send('Please enter a valid message,    Format: /query?message=message')
    }
})

//Accepting input from examining dynamic url parameters
app.get('/urlparams/:example', (req, res) => {
    if (req.params.example && req.params.example.trim()) {
        res.send(`Your parameter was: ${req.params.example}`)
    }
})

app.get('/urlparams', (req, res) => {
    res.status(400).send('Please enter a valid message,    Format: /urlparams/param')
})

app.all(`*path`, (req, res) => {
    res.status(404).send('404 Page not found')
})

app.listen(port, () => {
    console.log('Server started at port:', port)
})



/////////////////////////////////////Original HTTP Server//////////////////////////////////////
/*const http = require('http')
const fs = require('fs')
const url = require('url')


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
*/
