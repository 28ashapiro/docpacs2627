const express = require('express');
const entryModel = require('../models/entryModel');
const session = express.Router();

session.get('/session-test', (req, res, next) => {
    if(req.session.views) {
        req.session.views++

        res.render('sessionTest', { appName: process.env.APP_NAME, currentPage: 'sessiontest', viewcount: req.session.views } )
    } else {
        req.session.views = 1
    }
    });