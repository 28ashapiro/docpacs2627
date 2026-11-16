const express = require('express')
const session = express.Router()

session.get('/sessionTest', (req, res) => {
    if (!req.session.views) {
        req.session.views = 0
    }
    req.session.views += 1

    res.render('sessionTest', {
        title: 'Session Test',
        views: req.session.views,
        sessionID: req.sessionID
    })
})

session.post('/sessionTest/reset', (req, res) => {
    req.session.views = 0
    res.redirect('/sessionTest')
})

module.exports = {sessionRoutes: session}