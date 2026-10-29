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
    }

    if (isgreg == "greg") {
        date = new Date
        date = String(date)
        insert.run(isgreg, 'urlParams', date)
        res.status(400).render("it's a "+ isgreg)
    }
})

parameterRoute.get("/query", (req, res) => {
    if (req.query.message != '') {
        date = new Date
        date = String(date)
        insert.run(isgreg, 'urlParams', date)
        res.render(req.query.message)
    }
    if (req.query.message == '') {
        res.status(400).render("no word after message query")
    }
})

module.exports = {parameterRoute}