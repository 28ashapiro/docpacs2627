const express = require("express");
const formRoute = express.Router()
const {insert, rows} =  require('../models/entryModel');
formRoute.get('/form', (req, res) => {
    res.render('form', {
        title: "stupid form thing",
        navs: [{ 'href': '/', 'text': "home" }, { "href": '/form', "text": 'form' }]
    });
})

formRoute.post("/form", (req, res) => {
    console.log(req.body);
    if (req.body != '') {
        date = new Date
        date = String(date)
        var data ={
            value:req.body.studentName,
            sorce:'form',
            time:date
        }
        insert.run(data.value, data.sorce, data.time)
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