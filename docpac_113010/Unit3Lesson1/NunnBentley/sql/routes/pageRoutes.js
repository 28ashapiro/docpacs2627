const express = require('express')
const page = express.Router()
const path = require('path')


page.get('/', (req, res) => {
res.render('index', {
    title: 'Home Page'

})
})
module.exports = {page}