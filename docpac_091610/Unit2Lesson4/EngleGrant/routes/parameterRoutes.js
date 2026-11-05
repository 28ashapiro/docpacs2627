const express = require("express");

const router = express.Router()

console.log("route 3 hit")

router.get("/urlparams",(req,res) => {
    res.end("Add a parameter to the URL to return it.");
});

router.get("/urlparams/:param",(req,res) => {
    res.end(`Inputted parameter: ${req.params.param}`);
    res.send();
});

module.exports = router;