const express = require("express");
const {insert, rows} =  require('../models/entryModel');
const parameterRoute = express.Router()

parameterRoute.get(`/urlparams/:isgreg`, (req, res) => {
    const isgreg = req.params.isgreg;
    if (isgreg == '') {
        res.status(400).render('param empty')
    }

    if (isgreg != "greg") {
        date = new Date
        date = String(date)
        insert.run(isgreg, 'urlParams', date)
        res.render("it's a "+ isgreg +' not a greg')
        res.render('paramRes', {
            title: `it not a greg it's a ${isgreg}`,
            navs: [{ 'href': '/', 'text': "home" },
            { "href": '/form', "text": 'form' }]
        })
    }
    if (isgreg == "greg") {
        date = new Date
        date = String(date)
        insert.run(isgreg, 'urlParams', date)
        res.render('paramRes', {
            title: `it is a ${isgreg}`,
            navs: [{ 'href': '/', 'text': "home" },
            { "href": '/form', "text": 'form' }]
        })
    }
})

parameterRoute.get("/query", async (req, res) => {
    queryMes = req.query.message
    rowNum = req.query.rowNum
    if (queryMes != '') {
        if (queryMes == 'rows') { 
            Array(rows)
            res.render('rowsRes', {
                title: `here's that row db`,
                rows:rows,
                navs: [{ 'href': '/', 'text': "home" },
                { "href": '/form', "text": 'form' }]
            })}
            if (queryMes != 'rows') {
                res.render('queryRes', {
                    title: `${queryMes}`,
                    navs: [{ 'href': '/', 'text': "home" },
                    { "href": '/form', "text": 'form' }]
                })}
    }
    if (queryMes == '') {
        res.status(400).render("no word after message query")
    }
})

module.exports = {parameterRoute}