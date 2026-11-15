const express = require('express');
const router = express.Router();
const { createEntry, getAllEntries } = require('../models/entryModel');
console.log(getAllEntries());

//const path = require('path');

//router.get('/form', (req, res) => {
//res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
//});

router.get('/form', (req, res) => {
    res.render('form', { title: 'Information Form', message: 'HEY YOU! Please Fill Out My Cool Wicked Radical Superb Form I Made For You!' });
});

router.post('/form', (req, res) => {
    let userName = req.body.userName;
    let trimmedName = userName.trim();

    if (trimmedName === "") {
        res.status(400).render('error', {
            title: "400 Error!",
            message: "You got a 400 error",
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

    }
    else {
        console.log('Route was hit!');
        console.log(req.body);

        createEntry(trimmedName, 'form');
        const entries = getAllEntries();
        console.log('All entries from database:', entries);
        
        res.render('formResponse', {
            title: 'The Form You Submitted Is Coming Our Way!',
            message: 'Hey Hey!',
            userName: trimmedName,
            entries: entries
        });
    }
});

module.exports = router;