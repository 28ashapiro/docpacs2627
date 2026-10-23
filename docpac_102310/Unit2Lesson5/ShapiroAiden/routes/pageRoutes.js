const express = require('express');
const path = require('path');

const pageRouter = express.Router();

pageRouter.get('/', (req, res) => {
    res.render('index', {
        title: 'Index',
        appName: 'express app bruh',
        message: 'Replacing Node HTTP with Express.',
        pages: [
            {
                name: 'Form',
                url: '/form',
                description: 'Submit a text message.'
            },
            {
                name: 'Query',
                url: '/query?message=Hello',
                description: 'Try a query parameter.'
            },
            {
                name: 'URL Parameter',
                url: '/urlparams/Hello',
                description: 'Try a URL parameter.'
            }
        ]
    });
    console.log('-----------INDEX----------');
});

module.exports = pageRouter;
