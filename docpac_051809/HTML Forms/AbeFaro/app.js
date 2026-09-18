require('dotenv').config()
const http = require('http');
const name = process.env.APP_NAME
const port = process.env.PORT
const fs = require('fs');
const server = http.createServer((req, res) => {
    //res.writeHead(200, { 'Content-Type': 'text/plain' });

    //res.end('Hello, World!\n');
    console.log(`URL: ${req.url}`, `Method: ${req.method}`, `Listening on port: ${port}`)
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('Plain text response')
        res.end()
    }
    else if (req.url == '/form' && req.method == 'POST') {
        // This will handle the form submission
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>Form Submitted Successfully!</h1>')
        res.write('<p>Your form data has been received.</p>')
        res.write('<a href="/form">Submit another response</a>')
        res.end()
    }

    else if (req.url == '/form' && req.method == 'GET') {
        fs.readFile('./pages/form.html', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file: ', err)
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.write('Error loading form')
                res.end()
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
        })

    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('The requested page was not found.')
        res.end()
    }




});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);

});






