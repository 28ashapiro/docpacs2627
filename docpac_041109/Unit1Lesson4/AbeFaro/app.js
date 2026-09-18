require('dotenv').config()
const http = require('http');
const name = process.env.APP_NAME
const port = process.env.PORT
const fs = require('fs');

fs.readFile('./pages/form.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file: ', err)
        return
    }
    formPage = data
})

const server = http.createServer((req, res) => {
    //res.writeHead(200, { 'Content-Type': 'text/plain' });

    //res.end('Hello, World!\n');
    console.log(`URL: ${req.url}`, `Method: ${req.method}`, `Listening on port: ${port}`)
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('Plain text response')
    }
    else if (req.url == '/form') {
        res.writeHead(200, { 'Content-Type': 'html' })
        res.write(formPage)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('The requested page was not found')
    }
    res.end()



});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);

});






