require("dotenv").config()

const port = process.env.PORT;
const app_name = process.env.APP_NAME
const http = require('http')
const fs = require('fs')
let formPage
let lastsubmission = null
const allSubmissions = []

fs.readFile('pages/form.html', (err, data) => {
    if (err) {
        console.error('error cant read file', err)
        return
    }
    formPage = data
})


const server = http.createServer((req,res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
    const pathname = parsedUrl.pathname
    
    if (pathname == '/' && req.method == 'GET'){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('Plain text response')
        res.end()
    }

    else if (pathname == '/form' && req.method == 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(formPage)
        res.end()
    }
    else if (pathname == '/form' && req.method == 'POST'){
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const submission = new URLSearchParams(body)
            const submissionObj = Object.fromEntries(submission)


            const values = Object.values(submissionObj)
            const hasMissingOrBlank = values.length === 0 || values.some(v => !v || !v.trim())
            if (hasMissingOrBlank) {
                res.writeHead(400, {'Content-Type': 'text/plain'})
                res.write('Missing or blank fields in submission')
                res.end()
                return
            }
            allSubmissions.push(submissionObj)
            lastsubmission = submissionObj

            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.write(`Form submitted successfully: ${JSON.stringify(submissionObj)}`)
            res.end()
        })
    }
    else if (pathname == '/query' && req.method == 'GET'){
        const message = parsedUrl.searchParams.get('message')

        if (!message) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.write('Missing message query parameter')
            res.end()
            return
        }

        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(`You said: ${message}`)
        res.end()
    }
        else {
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.write('Not Found')
            res.end()
        }
    })

server.listen(port, 'localhost', () => {
    console.log(`Server running at http://localhost:${port}/form`)
})
