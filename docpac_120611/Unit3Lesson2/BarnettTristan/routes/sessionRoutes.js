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

sessionRoute.post('/session-test/reset', (req,res) => {
    if (req.session.views){
        delete req.session.views
        res.redirect('/session-test')
    }
    else {
        res.redirect('/session-test')
    }
})
module.exports = {sessionRoute}