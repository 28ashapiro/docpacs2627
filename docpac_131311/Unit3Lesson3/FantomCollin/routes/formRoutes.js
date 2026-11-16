const express = require('express');
const entryModel = require('../models/entryModel');
const Database = require('better-sqlite3');

const form = express.Router();

form.get('/form', (req, res) => {
    res.render('form', { appName: process.env.APP_NAME, currentPage: 'form' });
});

form.post('/form', (req, res) => {
    const submission = req.body.input;

    if (!submission || submission.trim === '') {
        return res.status(400).render(
            'error', {
            appName: process.env.APP_NAME, status: res.statusCode, statusInstr: 'Please enter a valid response', currentPage: 'form'
        });
    } else {
        const cleanSubmission = submission.trim();
        entryModel.createEntry(cleanSubmission, 'form');
        const entries = entryModel.getAllEntries();
        console.log('Submission recieved!');
        res.render('formResponse.ejs', { appName: process.env.APP_NAME, userInput: submission, currentPage: 'form', input: cleanSubmission, entries });
    };

});


module.exports = form;