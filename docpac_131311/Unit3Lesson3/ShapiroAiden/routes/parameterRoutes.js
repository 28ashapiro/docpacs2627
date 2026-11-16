
const express = require('express');
const paramRouter = express.Router();
const entryModel = require('../models/entryModel');
const path = require('path')

// URL PARAMETERS
paramRouter.get('/urlparams/:paramname', (req, res) => {
    const paramname = req.params.paramname;

    if (typeof paramname !== 'string' || paramname.trim() === '') {
        return res.status(400).render('error', {
            title: 'Invalid URL Parameter',
            status: 400,
            message: 'A URL parameter is required.'
        });
    }

    const coolparam = paramname.trim();
    entryModel.createEntry(coolparam, 'urlparam');

    const entries = entryModel.getAllEntries();
    res.render('parameterResponse', {
        title: 'Parameters',
        paramname: coolparam,
        entries: entries
    });
});

// QUERY PARAMETERS!!
paramRouter.get('/query', (req, res) => {
    const message = req.query.message;

    if (typeof message !== 'string' || message.trim() === '') {
        return res.status(400).render('error', {
            title: 'Invalid Query',
            status: 400,
            message: 'A query message is required.'
        });
    }

    const coolmessage = message.trim();
    entryModel.createEntry(coolmessage, 'query');
    res.render('queryResponse', {
        title: 'Query',
        message: coolmessage
    });
});

// ALL SAVED ENTRIES !!!
paramRouter.get('/entries', (req, res) => {
    const entries = entryModel.getAllEntries();

    res.render('entries', {
        title: 'All Saved Entries',
        entries: entries
    });
});

module.exports = paramRouter;
