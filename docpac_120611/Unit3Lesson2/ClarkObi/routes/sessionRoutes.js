const express = require('express');
const routesSession = express.Router();
routesSession.get('/session-test',(req,res)=>{
    if(!req.session.vists){req.session.vists=0};
    req.session.vists=req.session.vists+1
    res.render('sessionTest', {vistCount:req.session.vists})
});
module.exports=routesSession
