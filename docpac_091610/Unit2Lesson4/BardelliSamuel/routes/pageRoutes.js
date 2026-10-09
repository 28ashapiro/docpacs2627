const express = require('express')
const pageRoutes = express.Router()
const path = require('path')

pageRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/homepage.html'))
})

module.exports = {pageRoutes}