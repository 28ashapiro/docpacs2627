require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const {capture} = require('./utils/requestLogger')
const {pageRoutes} = require('./routes/pageRoutes')
const {formRoutes} = require('./routes/formRoutes')
const {parameterRoutes} = require('./routes/parameterRoutes')

app.use(capture)
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true,
    inflate: true,
    limit: "1mb",
    parameterLimit: 5000
}))
app.use(pageRoutes)
app.use(formRoutes)
app.use(parameterRoutes)


app.all(`*path`, (req, res) => {
    res.status(404).send('404 Page not found')
})

app.listen(port, () => {
    console.log('Server started at port:', port)
})