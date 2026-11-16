const express = require('express');
const router = express.Router();

router.get('/session-test', (req, res) => {
    let visits = req.session.visits;
    if(!visits) {
        visits = 1;
    } else {
        visits++;
    }
    req.session.visits = visits;
    res.render('sessionTest', {
        pageTitle: "Testing Page for Session and Page View Counts",
        visits: visits
    });
})

router.post('/session-test/reset', (req, res) => {
    delete req.session.visits;
    res.redirect('/session-test')
})

module.exports = router;

//visits is an instructional value that will laterbe replaced or supplemented by authenticated user information