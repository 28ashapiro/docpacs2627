const express = require("express");
const pageRoute = express.Router();
const path = require('path')

pageRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = {pageRoute}