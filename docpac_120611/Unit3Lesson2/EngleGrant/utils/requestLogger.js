function requestLogger(req, res, next) {
    time = new Date();
    method = req.method
    url = req.url
    
    console.log(time,method,url)

    next();
}

module.exports = requestLogger;