const express = require('express')
const router = express.Router();
router.get('/query', (req, res) => {
    const message = req.query.message?.trim();
    if (!message) {
        res.status(400).send(`Please provide a message: /query?message=YourMessage`);
    } else {
        res.status(200).send('You sent: ' + message);
    }
});
router.get('/urlparams/:paramname', (req, res) => {
    const message = req.params.paramname?.trim();
    if (!message) {
        res.status(400).send('No param');
    } else {
        res.status(200).send('You captured: ' + message);
    }
});
module.exports = router;