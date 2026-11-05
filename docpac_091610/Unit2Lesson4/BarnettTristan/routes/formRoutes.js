const express = require("express");
const path = require('path')
const formRoute = express.Router()

formRoute.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'));
})

formRoute.post("/form", (req, res) => {
    console.log(req.body);
    if (req.body == '') {
        res.status(400).send({
            status: 400,
            message: "missing answers"
        })
    }
    res.send();
})

module.exports = {formRoute}