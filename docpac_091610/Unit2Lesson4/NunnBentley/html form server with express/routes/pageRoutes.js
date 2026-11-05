const express = require('express')
const page = express.Router()
const path = require('path')


page.get('/', (req, res) => {
res.sendFile(Path.join(__dirname, '/public/index.html'))
})
module.exports = {page}