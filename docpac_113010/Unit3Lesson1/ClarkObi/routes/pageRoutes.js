const path = require('path');
const express = require('express');
const routesPage = express.Router()
routesPage.get('/',(req,res)=>{
    res.render('index')
});
module.exports=routesPage