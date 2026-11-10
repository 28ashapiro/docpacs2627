const path = require('path');
const express = require('express');
const routesParam = express.Router();
const entryModel=require('../models/entryModel')

routesParam.get('/urlparams/:paramname', (req,res) => {
    const paramsValue=req.params.paramname
    if (!paramsValue || paramsValue.trim() === "") {
        res.status(400).render('error',{errorMessage:'Error text submitted is blank'})
    }else{
        entryModel.addEntry(paramsValue,"/urlparams")
        const allEntries=entryModel.getAllEntries()
        res.render('parameterResponse',{username:paramsValue,entries:allEntries})}
});
routesParam.get('/query',(req,res)=>{
    const queryValue = req.query.message
    if (!queryValue || queryValue.trim() === "") {
        res.status(400).render('error',{errorMessage:'Error text submitted is blank'})
    }else{
        entryModel.addEntry(queryValue,"/query")
        const allEntries=entryModel.getAllEntries()
        res.render('queryResponse',{username:queryValue,entries:allEntries})}
});

module.exports=routesParam