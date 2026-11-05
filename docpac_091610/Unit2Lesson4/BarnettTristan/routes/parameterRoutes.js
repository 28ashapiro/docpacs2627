const express = require("express");
const parameterRoute = express.Router()

parameterRoute.get(`/urlparams/:isgreg`, (req, res) => {
    const isgreg = req.params.isgreg;
    if (isgreg == '') {
        res.status(400).send('param empty')
    }

    if (isgreg != "greg") {
        if (isgreg != "Greg") {
            res.send("it's a "+ isgreg +' not a greg')
        }
    }

    if (isgreg == "greg") {
        res.send("it's a "+ isgreg)
    }
})

parameterRoute.get("/query", (req, res) => {
    if (req.query.message != '') {
        res.send(req.query.message)
    }
    if (req.query.message == '') {
        res.status(400).send("no word after message query")
    }
})

module.exports = {parameterRoute}