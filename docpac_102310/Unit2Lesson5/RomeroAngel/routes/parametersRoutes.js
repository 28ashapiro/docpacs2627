const express = require('express');
const router = express.Router();

router.get('/query', (req, res) => {
    if (!req.query.message || req.query.message.trim() === "") {
        res.status(400).render('error', {
            title: "400 Error!",
            message: "Please provide a message",
            statusCode: 400,
            Linksandstuff: [
                {
                    text: "This Goes To The Form",
                    url: "/form",
                    description: "This button will go to the form page"
                },

                {
                    text: "This Link Takes You Back To A Valid Page!!!",
                    url: "/ejs-demo",
                    description: "This is for our EJS lesson!"
                },


                {
                    text: "This Goes To The UrlParams Example",
                    url: "/urlparams/Example",
                    description: "Here is a valid use of urlparams"
                },

                {
                    text: "This Goes To The A Query String Example",
                    url: "/query?message=Example",
                    description: "Here is a valid use of UrlParams"
                }
            ]
        });
    } else {
        res.render('queryResponse', {
            title: "The Query Message will now be recieved!",
            message: "Your Query Message now is:",
            queryMessage: req.query.message.trim()
        });
    }
});


router.get('/urlparams/:paramname', (req, res) => {
    if (!req.params.paramname || req.params.paramname.trim() === "") {
        res.status(400).render('error', {
            title: "400 Error!",
            message: "You must send a valid parameter",
            statusCode: 400,
            Linksandstuff: [
                {
                    text: "This Goes To The Form",
                    url: "/form",
                    description: "This button will go to the form page"
                },

                {
                    text: "This Link Takes You Back To A Valid Page!!!",
                    url: "/ejs-demo",
                    description: "This is for our EJS lesson!"
                },


                {
                    text: "This Goes To The UrlParams Example",
                    url: "/urlparams/Example",
                    description: "Here is a valid use of urlparams"
                },

                {
                    text: "This Goes To The A Query String Example",
                    url: "/query?message=Example",
                    description: "Here is a valid use of UrlParams"
                }

            ]
        });
    } else {
        res.render('parameterResponse', {
            title: "urlparams message is here!",
            message: "Hey Hey! Your urlparams message now is:",
            parameterResponse: req.params.paramname.trim()
        });
    }
});

module.exports = router;

