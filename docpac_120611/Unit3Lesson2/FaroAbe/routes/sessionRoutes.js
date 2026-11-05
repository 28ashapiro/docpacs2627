const express = require('express');
const router = express.Router();

router.get('/session-test', (req, res) => {
    if (!req.session.visitCount) {
        req.session.visitCount = 0;
    }

    // NOTE: In future lessons, this session will store authenticated user ID instead of visit count

    req.session.visitCount++;

    res.render('sessionTest', {
        pageTitle: 'Session Test',
        visitCount: req.session.visitCount,
        sessionID: req.sessionID
    });
});

router.post('/session-test/reset', (req, res) => {
    req.session.visitCount = 0;
    res.redirect('/session-test');
});

module.exports = router;
