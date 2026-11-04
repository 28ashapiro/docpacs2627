const express = require('express');
const router = express.Router();
const path = require('path');

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
            // res.status(400).render('queryResponse.ejs', {
            //     pageTitle: "Invalid Query Response!",
            //     queryResponse: `Please provide a message parameter. \"Example: /query?message=YourMessage\". Your query (the part of the URL that comes AFTER \"query\") was blank!`
            // })
            res.status(400).render('error.ejs', {
                pageTitle: "An Error Has Occurred!",
                statusCode: 400,
                errorHeading: "Error 400",
                message: "Your query (the part of the URL that comes AFTER \"query\") was blank! Please provide a message parameter (\"Example: /query?message=YourMessage\") or",
                linkText: "return to the homepage",
                linkURL: "/",
            })
        } else {
            res.render('queryResponse.ejs', {
                pageTitle: "Successful Query Response",
                queryResponse: `Your message is: ${trimmedMessage}`
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
            linkURL: "/",
        })
    } else {
        res.render('parameterResponse.ejs', {
            pageTitle: "Successful Parameter Response",
            parameterResponse: `Your URL parameter is ${trimmedParameter}`
        })
    }
})

module.exports = router;