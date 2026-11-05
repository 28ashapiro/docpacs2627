const express = require('express');
const path = require('path');
const router = express.Router();





router.get('/form', (req, res) => {
    res.render('form', {
        pageTitle: 'Project Interest Form'
    });
});


router.post('/form', (req, res) => {
    const studentName = req.body.studentName;

    if (!studentName || typeof studentName !== 'string') {
        return res.status(400).render('error', {
            pageTitle: 'Error',
            statusCode: 400,
            errorMessage: 'Name is required and must be text.'
        });
    }

    const trimmedName = studentName.trim();

    if (trimmedName === '') {
        return res.status(400).render('error', {
            pageTitle: 'Error',
            statusCode: 400,
            errorMessage: 'Name cannot be blank.'
        });
    }

    res.render('formResponse', {
        pageTitle: 'Form Submitted',
        studentName: trimmedName
    });
});


module.exports = router;



