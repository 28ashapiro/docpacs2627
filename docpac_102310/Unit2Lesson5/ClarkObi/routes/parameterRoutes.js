const path = require('path');
const express = require('express');
const routesParam = express.Router()

routesParam.get('/urlparams/:paramname', (req,res) => {
    const paramsValue=req.params.paramname
    if (!paramsValue || paramsValue.trim() === "") {
        res.status(400).render('error',{errorMessage:'Error text submitted is blank'})
    }else{res.render('parameterResponse',{username:paramsValue})}
})
routesParam.get('/query',(req,res)=>{
    const queryValue = req.query.message
    if (!queryValue || queryValue.trim() === "") {
        res.status(400).render('error',{errorMessage:'Error text submitted is blank'})
    }else{res.render('queryResponse',{username:queryValue})}
})

module.exports=routesParam