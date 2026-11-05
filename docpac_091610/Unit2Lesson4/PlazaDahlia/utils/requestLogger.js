function requestLogger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    res.on('finish', () => {
        console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode}`)
    });
    next();
}

module.exports = requestLogger;