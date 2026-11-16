function logRequest(req, res, next) { //middleware
    const currentDate = new Date();
    const currentTime = new Date().toLocaleTimeString();
    const currentMethod = req.method;
    const currentURL = req.url;

    res.on('finish', () => {
        console.log(`[${currentDate} ${currentTime}] ${currentMethod} ${currentURL} ${res.statusCode}`);
    })

    next();
}

module.exports = logRequest;