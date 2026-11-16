const express = require("express");
const entryModel = require("../models/entryModel")

const router = express.Router()

router.get("/urlparams",(req,res) => {
    entries = entryModel.getAllEntries()

    res.render('database.ejs',{pageTitle: "Database", entries: entries});
    
});

router.get("/urlparams/:param",(req,res) => {
    if (req.params.param.trim() != null) {
        entryModel.createEntry(req.params.param, "Param Messager");
        res.end(`Inputted parameter: ${req.params.param}`);
    } else {
        res.end("Invalid input");
    }
});

module.exports = router;