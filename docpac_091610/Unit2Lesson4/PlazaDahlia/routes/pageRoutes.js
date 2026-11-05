const express = require('express')
const router = express.Router();
router.get('/', (req, res) => {
    res.send('<h2 id="title">This is Forms and Stuff</h2><p>This where all the forms and stuff will be</p><a href="/form">The Project Interest Form</a>')
});
module.exports = router;