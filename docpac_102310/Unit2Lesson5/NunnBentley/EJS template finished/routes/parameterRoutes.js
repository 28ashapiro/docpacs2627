const express = require('express')
const parameter = express.Router()




parameter.get('/query', (req, res) => {
    if (req.query.message && typeof req.query.message == 'string' && req.query.message.trim()) {
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
        res.render('urlParamResponse', { title: req.params.paraname })
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