const express = require('express');
const router = express.Router();
const entryModel = require('../models/entryModel');


router.get('/query', (req, res) => {
    const message = req.query.message;

    if (!message || typeof message !== 'string') {
        return res.status(400).render('error', {
            pageTitle: 'Error',
            statusCode: 400,
            errorMessage: 'Message is required and must be text.'
        });
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage === '') {
        return res.status(400).render('error', {
            pageTitle: 'Error',
            statusCode: 400,
            errorMessage: 'Message cannot be blank.'
        });
    }

    res.render('queryResponse', {
        pageTitle: 'Query Result',
        message: trimmedMessage
    });
});


router.get('/urlparams/:paramname', (req, res) => {
    const paramValue = req.params.paramname;

    if (!paramValue || typeof paramValue !== 'string') {
        return res.status(400).render('error', {
            pageTitle: 'Error',
            statusCode: 400,
            errorMessage: 'Parameter is required and must be text.'
        });
    }

    const trimmedValue = paramValue.trim();

    if (trimmedValue === '') {
        return res.status(400).render('error', {
            pageTitle: 'Error',
            statusCode: 400,
            errorMessage: 'Value cannot be blank.'
        });
    }

    entryModel.createEntry(trimmedValue, 'urlparam');


    const allEntries = entryModel.getAllEntries();


    res.render('parameterResponse', {
        pageTitle: 'Parameter Result',
        paramValue: trimmedValue,
        entries: allEntries  // ← NEW: Pass all entries to view
    });
});


module.exports = router;
