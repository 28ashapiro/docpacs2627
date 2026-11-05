const express = require('express');
const router = express.Router();

router.get('/session-testpage', (req, res) => {
    if (req.session.visits) {
        req.session.visits++;
    } else {
        req.session.visits = 1;
    }

    res.render('sessionTest', {
        visits: req.session.visits,
        title: "Hey You Visited The Test Page!",
        message: "Thank You For Visting This Page, Here is the test for sessions!",
    });
});

router.post('/session-testpage/reset', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/session-testpage');
        }
    });
});

module.exports = router;