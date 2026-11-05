const express = require('express');
const path = require('path');
const { title } = require('process');

const root = express.Router();

root.get('/', (req, res) => {
    res.render('index', { appName: process.env.APP_NAME, currentPage: 'home' });
});

root.get('/instructions', (req, res) => {
    res.render('instructions', { appName: process.env.APP_NAME, currentPage: 'instructions' });
});

root.get('/topics', (req, res) => {
    const topics = [
        {
            title: 'Bookland',
            url: 'https://en.wikipedia.org/wiki/Bookland',
            desc: 'A fake country that only exists in the European Barcode System.',
        },
        {
            title: 'COVID-19 Antarctica Pandemic',
            url: 'https://en.wikipedia.org/wiki/COVID-19_pandemic_in_Antarctica',
            desc: 'A legitimate part of the Coronavirus Pandemic that was issued for Antarctica.',
        },
        {
            title: 'Jack Black',
            url: 'https://en.wikipedia.org/wiki/Jack_Black_(rat_catcher)',
            desc: "Not talkin' about Kung Foo Panda, here. Different Jack Black.",
        }
    ];
    res.render('topics', { appName: process.env.APP_NAME, currentPage: 'topics', topics: topics });

});

module.exports = root;