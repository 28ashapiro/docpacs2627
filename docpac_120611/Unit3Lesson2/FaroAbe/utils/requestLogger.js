function requestLogger(req, res, next) {
    const timestamp = new Date().toLocaleTimeString();
    const method = req.method;
    const url = req.originalUrl;


    res.on('finish', () => {
        const status = res.statusCode;
        console.log(`[${timestamp}] ${method} ${url} ${status}`);
    });

    next();
}


module.exports = requestLogger;
