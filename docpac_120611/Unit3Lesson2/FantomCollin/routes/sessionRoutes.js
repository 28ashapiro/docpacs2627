const express = require('express');
const entryModel = require('../models/entryModel');
const session = express.Router();

session.get('/session-test', (req, res, next) => {
    if(req.session.views) {
        console.log('req.session exists?', req.session);
        req.session.views++
        res.render('sessionTest', { appName: process.env.APP_NAME, currentPage: 'session', viewcount: req.session.views, welcome: 'WELCOME BACK!' } )
    } else {
        req.session.views = 1
        res.render('sessionTest', { appName: process.env.APP_NAME, currentPage: 'session', viewcount: req.session.views, welcome: 'WELCOME IN, NEWCOMER!' } )
    }
    });

    module.exports = session;
    
    session.post('/session-test/reset', (req, res) => {
        
    })