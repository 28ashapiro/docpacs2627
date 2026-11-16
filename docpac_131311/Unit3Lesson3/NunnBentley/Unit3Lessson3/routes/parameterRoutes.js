const express = require('express')
const parameter = express.Router()
const { createEntries, getAllEntries } = require('../models/entryModel')



parameter.get('/query', (req, res) => {
    if (req.query.message && typeof req.query.message == 'string' && req.query.message.trim()) {
        createEntries(req.query.message, new Date().toISOString(), 'query');
        res.render('queryResponse', { 
            title: `your message is, ${req.query.message}`,
        })
    }
    else {
        res.status(400).render('error', { 
            title: 'error',
            message: 'put in a valid input',
            code: res.statusCode
        })
            
    }
})

parameter.get("/urlparams/:paraname", (req, res) => {
    if (req.params.paraname && req.params.paraname.trim ()) {
        createEntries(req.params.paraname, new Date().toISOString(), 'urlparams');
        res.render('parameterResponse', { title: req.params.paraname, entries: getAllEntries() })
    }
})

parameter.get('/urlparams', (req, res) => {
    res.status(400).render('error', { 
        title: 'error',
        message: 'put in a valid input',
        code: res.statusCode 
        
    })
})
    



module.exports = {parameter}