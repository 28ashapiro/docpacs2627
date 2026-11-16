const express = require('express');
const path = require('path');

const pageRouter = express.Router();

pageRouter.get('/', (req, res) => {
    res.render('index', {
        title: 'Index',
        appName: 'Cool and Awesome Express App',
        message: 'Replacing uncool and not awesome Node HTTP with cool and awesome Express.',
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
            },
            {
                name: 'Entries',
                url: '/entries',
                description: 'View a list of cool and awesome entries.'
            },
            {
                name: 'Sessions',
                url: '/session-test',
                description: 'Test persistent browser sessions.'
            }
        ]
    });
    console.log(' - INDEX - ');
});

module.exports = pageRouter;
