const requestLogger = require('./utils/requestLogger')

require('dotenv').config()
fs = require('fs')
http = require('http')
url = require('url')
express = require('express')
app = express();
path = require('path')
const PORT = process.env.PORT

app.use(
    express.urlencoded({
        extended: true,
        inflate: true,
        limit: "1mb",
        parameterLimit: 5000,
        type: "application/x-www-form-urlencoded",
    })
);

app.use(requestLogger)

app.get('/', (req,res) => {

    res.send("boo")

})

app.get('/form', (req,res) => {

    res.sendFile(path.join(__dirname, 'public/form.html'))

})

app.post('/form', (req, res) => {

    body = req.body
    console.log(body.email)
    if(body){
    res.send(body)
    }
    else {
        res.status(400).send("error missing input!")
    }
})

app.get('/query', (req,res) => {

    res.send("Your message was " + req.query.message)

})

app.get('/urlparams/:urlparam', (req, res) => {

    res.send(req.params.urlparam)

})





app.use(express.static('public'))

app.listen(PORT, () => {
    console.log('Server started!')
})

