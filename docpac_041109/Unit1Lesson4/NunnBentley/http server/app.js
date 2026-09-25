require("dotenv").config()

const port = process.env.PORT;
const app_name = process.env.APP_NAME
const http = require('http')
const fs = require('fs')
let formPage

fs.readFile('pages/form.html', (err, data) => {
    if (err) {
        console.error('error cant read file', err)
        return
    }
    formPage = data
})


const server = http.createServer((req,res) => {
    if (req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('Plain text response')
    }
    else if (req.url == '/form'){
        res.writeHead(200, {'Content-Type': 'html'})
        res.write(formPage)
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('The requested page could not be found')
    }
    res.end()

    

})

server.listen(port, 'localhost', () => {
    console.log(`Server running at http://localhost:${port}/`)
})
