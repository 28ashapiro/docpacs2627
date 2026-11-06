const express = require('express');
const router = express.Router();
const path = require('path');
const { createEntry, getAllEntries } = require('../models/entryModel.js');

router.get('/query', (req, res) => {
    const message = req.query.message;
    if (message === undefined) {
        res.status(400).render('error.ejs', {
            pageTitle: "An Error Has Occurred!",
            statusCode: 400,
            errorHeading: "Error 400",
            message: "You didn't provide a message parameter (the part of the URL that comes AFTER \"query\")! Please provide a message parameter \"Example: /query?message=YourMessage\" or ",
            linkText: "return to the homepage",
            linkURL: "/",
        })
    } else {
        const trimmedMessage = message.trim();
        if (trimmedMessage === "") {
            res.status(400).render('error.ejs', {
                pageTitle: "An Error Has Occurred!",
                statusCode: 400,
                errorHeading: "Error 400",
                message: "Your query (the part of the URL that comes AFTER \"query\") was blank! Please provide a message parameter (\"Example: /query?message=YourMessage\") or",
                linkText: "return to the homepage",
                linkURL: "/",
            })
        } else {
            createEntry(trimmedMessage, "queryparam");
            const entries = getAllEntries();
            res.render('queryResponse.ejs', {
                pageTitle: "Successful Query Response",
                queryResponse: `Your message is: ${trimmedMessage}`,
                entries: entries
            })
        }
    }
})

router.get('/urlparams/:paramname', (req, res) => {
    const parameter = req.params.paramname;
    const trimmedParameter = parameter.trim();
    if (trimmedParameter === "") {
        res.status(400).render('error.ejs', {
            pageTitle: "An Error Has Occurred!",
            statusCode: 400,
            errorHeading: "Error 400",
            message: "Your URL parameter was either blank or a space! Please provide a valid URL parameter. Example: '/urlparams/YourTextHere' or ",
            linkText: "return to the homepage",
            linkURL: "/"
        })
    } else {
        createEntry(trimmedParameter, "urlparam");
        const entries = getAllEntries();
        res.render('parameterResponse.ejs', {
            pageTitle: "Successful Parameter Response",
            parameterResponse: `Your URL parameter is ${trimmedParameter}`,
            entries: entries
        })
    }
})

module.exports = router;