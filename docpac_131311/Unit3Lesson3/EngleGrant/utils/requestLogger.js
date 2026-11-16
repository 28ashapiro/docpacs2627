function requestLogger(req, res, next) {
    time = new Date();
    method = req.method
    url = req.url

    cookie = JSON.stringify(req.session)
    
    console.log(time,method,url)

    next();
}

module.exports = requestLogger;