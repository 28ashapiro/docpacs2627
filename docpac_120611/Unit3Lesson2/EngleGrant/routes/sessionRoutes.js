const express = require("express");

const router = express.Router()

router.get("/session-test",(req, res) => {

    if (req.session.visits) { // visits is an instructional value for the cookie and should not be used in future lessons.
        req.session.visits++
    } else {
        req.session.visits = 1 
    }
    console.log(JSON.stringify(req.session))
    res.render("sessionTest.ejs",{pageTitle: "Session Testing", visits: JSON.stringify(req.session.visits)})
});

router.post("/session-test/reset", (req, res) => {
    delete req.session.visits;
    res.redirect("/session-test");
});
    
router.post("/session-test",(req, res) => {
    res.end("post to /session-test")
    res.send()
});

module.exports = router;