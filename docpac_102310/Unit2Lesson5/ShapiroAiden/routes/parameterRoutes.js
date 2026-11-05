const express = require('express');
const paramRouter = express.Router();
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

    res.render('parameterResponse', {
        title: 'Parameters',
        paramname: paramname.trim()
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

    res.render('queryResponse', {
        title: 'Query',
        message: message.trim()
    });

});

module.exports = paramRouter;
