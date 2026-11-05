const express = require('express')
const parameter = express.Router()



parameter.get("/urlparams/:paraname", (req, res) => {
    if (req.params.paraname && req.params.paraname.trim ()) {
        res.send(`your url param was ${req.params.paraname}`)
    }
})

parameter.get('/urlparams', (req, res) => {
    res.status(400).send('put in a valid input')
})


module.exports = {parameter}