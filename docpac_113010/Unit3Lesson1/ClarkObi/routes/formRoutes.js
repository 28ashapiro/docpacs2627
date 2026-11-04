const path = require('path');
const express = require('express');
const { text } = require('stream/consumers');
const routesForm = express.Router();
const entryModel=require('../models/entryModel')

routesForm.post('/form',(req,res) => {
    const user = req.body.username
    const navItems=[{text:'Homepage',url:'/'},{text:'Submition form',url:'/form'}]
    if (!user || user.trim() === "") {
        res.status(400).render('error',{errorMessage:'Error text submitted is blank'})
    } else{
        entryModel.addEntry(user,"/form")
        const allEntries=entryModel.getAllEntries()
        res.render('formResponse',{username:user,urls:navItems,entries:allEntries})}
}); 

routesForm.get('/form',(req,res) => {
    const navItems=[{text:'Homepage',url:'/'},{text:'Submition form',url:'/form'}]
    res.render('form',{urls:navItems})
});

module.exports=routesForm