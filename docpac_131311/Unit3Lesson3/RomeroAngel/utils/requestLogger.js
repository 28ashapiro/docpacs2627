function requestLogger(req, res, next) {
    const currentDate = new Date();
    console.log(currentDate.toString(), req.originalUrl, req.method);

    res.on('finish', function () {
        console.log(res.statusCode);
    });

    next();
}
module.exports = requestLogger;