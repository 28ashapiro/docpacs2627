function requestLogger(req, res, next){
    
    method = req.method
    url = req.url
    time = Date()
    console.log(time, method, url)
    next()
}

module.exports = requestLogger