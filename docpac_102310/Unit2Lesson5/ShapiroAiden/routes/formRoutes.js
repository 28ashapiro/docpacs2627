const express = require('express')
const path = require('path')

const formRouter = express.Router();
//GETTT!!!
formRouter.get('/form', (req, res) => {
    res.render('form', {
        title: 'Form',
        message: 'Enter a message below.'
    });
});

//POST!!!!
formRouter.post('/form', (req, res) => {
    const text = req.body.text;
    if (typeof text !== 'string' || text.trim() === '') {
        return res.status(400).render('error', {
            title: 'Invalid Form',
            status: 400,
            message: 'Please enter something in the text box!!!'
        });
    }
    const cooltext = text.trim();
    console.log('|', new Date().toLocaleString(), '|', 'FORM-RESULT:', cooltext);
    res.render('formResponse', {
        title: 'Form Response',
        text: cooltext
    });
});

module.exports = formRouter;
