const express = require('express');
const path = require('path');

const pageRouter = express.Router();

pageRouter.get('/', (req, res) => {
    res.render('index', {
        title: 'Index',
        appName: 'Cool and Awesome Express App',
        message: 'Replacing Node HTTP with cool and awesome Express.',
        pages: [
            {
                name: 'Form',
                url: '/form',
                description: 'Submit a cool and awesome text message.'
            },
            {
                name: 'Query',
                url: '/query?message=Hello',
                description: 'Try a cool and awesome query parameter.'
            },
            {
                name: 'URL Parameter',
                url: '/urlparams/Hello',
                description: 'Try a cool and awesome URL parameter.'
            }
        ]
    });
    console.log('|---------@INDEX---------|');
});

module.exports = pageRouter;
