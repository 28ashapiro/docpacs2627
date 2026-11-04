const express = require("express");

const sessionRoute = express.Router();

sessionRoute.get('/session-test', (req,res) => {
        if (req.session.views) {
            req.session.views += 1
            res.render('sessionTest', {
                title: `viewed this page ${req.session.views} times`,
                lookedAt: req.session.views,
                navs: [{ 'href': '/', 'text': "home" },
                { "href": '/form', "text": 'form' }]
            })
        }
        else {
            req.session.views = 1
            res.render('sessionTest', {
                title: `New session made`,
                navs: [{ 'href': '/', 'text': "home" },
                { "href": '/form', "text": 'form' }]
            })
        }
})
module.exports = {sessionRoute}