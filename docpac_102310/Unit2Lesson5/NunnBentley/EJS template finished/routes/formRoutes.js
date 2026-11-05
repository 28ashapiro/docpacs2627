const express = require('express')
const form = express.Router()
const path = require('path')


form.get('/form', (req, res) => {
res.render('form', {
    title: 'Form Page'
    })
})

form.post('/form', (req, res) => {
    if (req.body.age && typeof req.body.age == 'string' && req.body.age.trim()) {
        res.send(`you are ${req.body.age} years old!`)
    } else {
            res.status(400).send('put in a valid input')
        }
})
module.exports = {form}