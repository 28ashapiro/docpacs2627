const express = require('express');
const sessionRouter = express.Router();

// SESSION TEST!!!
sessionRouter.get('/session-test', (req, res) => {
    if (!req.session.visits) {
        req.session.visits = 0;
    }
    req.session.visits++;
    res.render('sessionTest', {
        title: 'Session Test',
        visits: req.session.visits
    });
    console.log(' -', new Date().toLocaleString(), '-', 'session count:', req.session.visits, '- ');
});

// reset session visits!!!
sessionRouter.post('/session-test/reset', (req, res) => {
    delete req.session.visits;
    res.redirect('/session-test');
    console.log(' -', new Date().toLocaleString(), '-', 'session count reset!', '- ');
});

// the  visit counter is only fort his lesson. 
// in the future, sessions will store user info!

module.exports = sessionRouter;