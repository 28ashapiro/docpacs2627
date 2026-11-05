const express = require('express');
const entryModel = require('../models/entryModel')

const parama = express.Router();

parama.get('/query', (req, res) => {
    const message = req.query.message;
    if (typeof message !== 'string' || message.trim() === '') {
        return res.status(400).render('error', { appName: process.env.APP_NAME, status: res.statusCode, statusInstr: 'Please enter a valid response', currentPage: 'query', });
    } else {
        res.render('queryResponse', { appName: process.env.APP_NAME, query: message, currentPage: 'query', });
    };

});

parama.get('/urlparams/:paramname', (req, res) => {
    const param = req.params.paramname;
    if (!param || param.trim() === '') {
        return res.status(400).render('error', { appName: process.env.APP_NAME, status: res.statusCode, statusInstr: 'Please enter a valid response', currentPage: 'query' });;
    } else {
        const cleanParam = param.trim();
        entryModel.createEntry(cleanParam, 'urlparams')
        const entries = entryModel.getAllEntries()
        res.render('parameterResponse', { appName: process.env.APP_NAME, parame: param, currentPage: 'query', input: cleanParam, entries });
    };

});

module.exports = parama;