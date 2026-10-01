require("dotenv").config()

const port = process.env.PORT;
const app_name = process.env.APP_NAME
const express = require('express')
const app = express()

app.use(express.static('public'))

app.listen(port, 'localhost', () => {
    console.log(`Server running at http://localhost:${port}/`)
})
