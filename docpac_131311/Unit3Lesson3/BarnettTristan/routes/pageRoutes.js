const express = require("express");
const pageRoute = express.Router();

pageRoute.get('/', (req, res) => {
    res.render('index', {
        title: 'home',
        desc: 'example thing',
        appname: 'greff',
        subtitle: 'dhgfsahjjhfdjksjsjakdjs',
        navs: [{ 'href': '/', 'text': "home" },
        { "href": '/form', "text": 'form' }]
    });
});

module.exports = { pageRoute }