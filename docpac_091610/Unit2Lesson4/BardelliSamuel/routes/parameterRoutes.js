const express = require('express')
const parameterRoutes = express.Router()

//Accepting input from examining a query string
parameterRoutes.get('/query', (req, res) => {
    if (req.query.message && typeof req.query.message == 'string' && req.query.message.trim()) {
        res.send(`Your message was: ${req.query.message}`)
    }
    else {
        res.status(400).send('Please enter a valid message,    Format: /query?message=message')
    }
})

//Accepting input from examining dynamic url parameters
parameterRoutes.get('/urlparams/:example', (req, res) => {
    if (req.params.example && req.params.example.trim()) {
        res.send(`Your parameter was: ${req.params.example}`)
    }
})

parameterRoutes.get('/urlparams', (req, res) => {
    res.status(400).send('Please enter a valid message,    Format: /urlparams/param')
})
module.exports = {parameterRoutes}