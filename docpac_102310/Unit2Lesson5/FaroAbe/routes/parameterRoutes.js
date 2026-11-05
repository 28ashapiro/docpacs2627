const express = require('express');
const router = express.Router();


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

    res.render('parameterResponse', {
        pageTitle: 'Parameter Result',
        paramValue: trimmedValue
    });
});

module.exports = router;
