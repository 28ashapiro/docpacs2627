const path = require('path');
const express = require('express');
const routesParam = express.Router()

routesParam.get('/urlparams/:paramname', (req,res) => {
    const paramsValue=req.params.paramname
    if (!paramsValue || paramsValue.trim() === "") {
        res.status(400).send('Error text submitted is blank')
    }else{res.send(paramsValue)}
})
routesParam.get('/query',(req,res)=>{
    const queryValue = req.query.message
    if (!queryValue || queryValue.trim() === "") {
        res.status(400).send('Error text submitted is blank')
    }else{res.send(queryValue)}
})

module.exports=routesParam