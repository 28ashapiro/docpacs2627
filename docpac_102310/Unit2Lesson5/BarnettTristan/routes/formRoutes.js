const express = require("express");
const formRoute = express.Router()

formRoute.get('/form', (req, res) => {
    res.render('form', {
        title: "stupid form thing",
        navs: [{ 'href': '/', 'text': "home" }, { "href": '/form', "text": 'form' }]
    });
})

formRoute.post("/form", (req, res) => {
    console.log(req.body);
    if (req.body != '') {
        res.render('formRes', {
            title: `your name is ${req.body.studentName}`,
            navs: [{ 'href': '/', 'text': "home" },
            { "href": '/form', "text": 'form' }]
        })
    }
    else {
        res.status(400).render({
            title: 'error',
            message: "missing answers",
            code: res.statusCode,
            href: '/form',
            navs: [{ 'href': '/', 'text': "home" },
                { "href": '/form', "text": 'form' }]
        })
    }

})

module.exports = { formRoute }
