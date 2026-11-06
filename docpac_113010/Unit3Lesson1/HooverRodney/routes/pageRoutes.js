require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const port = process.env.PORT;
const appName = process.env.APP_NAME;

router.get('/', (req, res) => {
    const lessons = [
        {
            linkText: "Lesson 1",
            url: "https://github.com/csmith1188/docpacs2627/raw/refs/heads/main/docpac_062509/Unit2Lesson1/Unit2Lesson1.docx",
            description: "Introduced Express to the operation of the server — replacing the previously-used HTTP server code and decreasing the amount of work that it initially took to debug the site! What remains of the original Express-implementation is now found in what's now the homepage!"
        },
        {
            linkText: "Lesson 2",
            url: "https://github.com/csmith1188/docpacs2627/raw/refs/heads/main/docpac_070210/Unit2Lesson2/Unit2Lesson2.docx",
            description: "Introduced Express routing to the operation of the server, which made the process of adding new routes and allowed easier processing of POST requests from the form page!"
        },
        {
            linkText: "Lesson 3",
            url: "https://github.com/csmith1188/docpacs2627/raw/refs/heads/main/docpac_080910/Unit2Lesson3/Unit2Lesson3.docx",
            description: "Introduced request logging, and organized modules! This prevented all of the code from having to run from the server code!"
        },
        {
            linkText: "Lesson 4",
            url: "https://github.com/csmith1188/docpacs2627/raw/refs/heads/main/docpac_091610/Unit2Lesson4/Unit2Lesson4.docx",
            description: "Organized request routes into separate modules! This stops the server script from running all of the routing code —allowing the server script to focus on configuring middleware, mounting routers, and starting the server! It also just makes things easier to look through in the event of a route failing!"
        },
        {
            linkText: "Lesson 5",
            url: "https://github.com/csmith1188/docpacs2627/raw/refs/heads/main/docpac_102310/Unit2Lesson5/Unit2Lesson5.docx",
            description: "Introduced dynamic web pages with EJS templates! This is what allows this here lesson page to exist! This now allows me to dynamically serve pages to the browser based on the data provided!" 
        }
    ];

    res.render('index', {
        pageTitle: "Homepage",
        appName: appName,
        description: "The homepage for the Interest Form and Unit 2 Lesson 5: Dynamic Views with EJS templates",
        lessons: lessons
    });
})

module.exports = router;