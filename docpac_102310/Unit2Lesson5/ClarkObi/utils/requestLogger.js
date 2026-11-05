function requestLogger(req,res,next) {
    let time=Date()
    let method=req.method
    let url=req.url
    console.log(time,method,url);
    
    res.on('finish',()=>{
    console.log(time,method,res.statusCode)
    }) 

    next()
}
module.exports=requestLogger
