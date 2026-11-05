require("dotenv").config()

const take = require('./utils/requestlogger')
const {page} = require('./routes/pageRoutes')
const {form} = require('./routes/formRoutes')
const {parameter} = require('./routes/parameterRoutes')

const port = process.env.PORT;
const app_name = process.env.APP_NAME
const express = require("express")
const app = express()

app.use(take)

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true,
}))

app.use(page)
app.use(form)
app.use(parameter)

app.all('*path', (req, res) => {
    res.status(404).send('404 Page not found put in correct url')
})

app.listen(port, 'localhost', () => {
    console.log(`Server running at http://localhost:${port}`)
})
