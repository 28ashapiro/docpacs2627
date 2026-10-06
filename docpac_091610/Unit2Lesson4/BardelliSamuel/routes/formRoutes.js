const express = require('express')
const formRoutes = express.Router()
const path = require('path')

formRoutes.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'))
})

//Accepting input from examining form request body data
formRoutes.post('/form', (req, res) => {
    if (req.body.name && typeof req.body.name == 'string' && req.body.name.trim()) {
        res.send(`Your name is: ${req.body.name}`)
    }
    else {
        res.status(400).send('Please enter a valid string into the input')
    }
})
module.exports = {formRoutes}