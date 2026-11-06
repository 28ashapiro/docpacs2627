const express = require('express');
const router = express.Router();
const path = require('path');
const port = process.env.PORT;
const appName = process.env.APP_NAME;

router.get('/form', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'form.html'));
    res.render('form', {
        pageTitle: "Form Page",
        appName: appName,
        description: "The Interest Form of Unit 2 Lesson 5: Dynamic Views with EJS templates",
    })
})

router.post('/form', (req, res) => {
    const studentName = req.body.studentName;
    if (studentName === "") {
        res.status(400).render('formResponse.ejs', {
            pageTitle: "Invalid Form Response!",
            studentName: studentName
        })
    } else {
        const trimmedName = studentName.trim();
        if (trimmedName === null || trimmedName === "") {
            res.status(400).render('formResponse.ejs', {
            pageTitle: "Invalid Form Response!",
            studentName: trimmedName
        })
        } else {
            res.render('formResponse.ejs', {
                pageTitle: "Successful Form Response",
                studentName: trimmedName
            });
        }
    }
})

module.exports = router;