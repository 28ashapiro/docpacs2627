const express = require("express");
const path = require("path");

const router = express.Router()

router.get("/",(req, res) => {
    res.render('index', {pageTitle: "Links"})
    // res.sendFile("public/index.html", options, (err) => {})
});
    
router.post("/",(req, res) => {
    res.end("post to /")
    res.send()
})

module.exports = router;