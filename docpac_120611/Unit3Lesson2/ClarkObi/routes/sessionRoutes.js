console.log('FILESTART');
router.get('/session-test',(req,res)=>{
    if(!req.session.vists){
        req.session.vists=0};
    req.session.vists=req.session.vists+1
    res.render('session-test', {vistCount:req.session.vists})
});
module.exports = router;
