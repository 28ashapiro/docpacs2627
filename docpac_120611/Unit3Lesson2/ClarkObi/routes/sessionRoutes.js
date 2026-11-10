const express = require('express');
const routesSession = express.Router();
routesSession.get('/session-test',(req,res)=>{
    if(!req.session.vists){req.session.vists=0};
    req.session.vists=req.session.vists+1
    res.render('sessionTest', {vistCount:req.session.vists})
});
routesSession.post('/session-test-reset',(req,res)=>{delete req.session.vists
    res.redirect('/session-test')
});
module.exports=routesSession
