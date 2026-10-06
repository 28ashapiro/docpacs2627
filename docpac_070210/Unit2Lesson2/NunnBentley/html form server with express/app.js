require("dotenv").config()

const port = process.env.PORT;
const app_name = process.env.APP_NAME
const express = require("express")
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true,
}))

app.get('/', (req, res) => {
res.sendFile(Path.join(__dirname, '/public/index.html'))
})

app.get('/form', (req, res) => {
res.sendFile(Path.join(__dirname, '/public/form.html'))
})

app.post('/form', (req, res) => {
    if (req.body.age && typeof req.body.age == 'string' && req.body.age.trim()) {
        res.send(`you are ${req.body.age} years old!`)
    } else {
            res.status(400).send('put in a valid input')
        }
})

app.get('/query', (req, res) => {
    if (req.query.message && typeof req.query.message === 'string' && req.query.message.trim()) {
        res.send(`your message was: ${req.query.message}`)
    }
    else {
        res.status(400).send('400 error')
    }
})


app.get("/urlparams/:paraname", (req, res) => {
    if (req.params.paraname && req.params.paraname.trim ()) {
        res.send(`your url param was ${req.params.paraname}`)
    }
})

app.get('/urlparams', (req, res) => {
    res.status(400).send('put in a valid input')
})

app.all('*path', (req, res) => {
    res.status(404).send('404 Page not found put in correct url')
})

app.listen(port, 'localhost', () => {
    console.log(`Server running at http://localhost:${port}`)
})
