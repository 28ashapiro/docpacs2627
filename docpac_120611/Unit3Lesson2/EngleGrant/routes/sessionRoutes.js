const express = require("express");
const path = require("path");

const router = express.Router()

const options = {
    root: path.join(__dirname)
}

router.get("/session-test",(req, res) => {

    if (req.session.visits) {
        req.session.visits++
    } else {
        req.session.visits = 1
    }
    
    res.render("sessionTest.ejs",{pageTitle: "Session Testing", visits: JSON.stringify(req.session.visits)})
});
    
router.post("/session-test",(req, res) => {
    res.end("post to /session-test")
    res.send()
})

module.exports = router;