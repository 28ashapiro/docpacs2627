const path = require('path');
const express = require('express');
const routesForm = express.Router();

routesForm.post('/form',(req,res) => {
    const user = req.body.username
    if (!user || user.trim() === "") {
        res.status(400).send('Error text submitted is blank')
    } else{res.send(user)}
}); 

routesForm.get('/form',(req,res) => {
    res.sendFile(path.join(__dirname,'../public/form.html'))
});

module.exports=routesForm