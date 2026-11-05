const express = require('express');
const path = require('path');

const form = express.Router();

form.get('/form', (req, res) => {
    res.render('form', { appName: process.env.APP_NAME, currentPage: 'form' });
});

form.post('/form', (req, res) => {
    const submission = req.body.input;


    if (!submission || submission.trim === '') {
        return res.status(400).render(
            'error', {
            appName: process.env.APP_NAME, status: res.statusCode, statusInstr: 'Please enter a valid response', currentPage: 'form', someValue: ''
        });
    } else {
        console.log('Submission recieved!');
        res.render('formResponse.ejs', { appName: process.env.APP_NAME, userInput: submission, currentPage: 'form' });

    };

});


module.exports = form;