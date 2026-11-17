function logger(req, res, next) {
    const timeOf = new Date();
    res.on("finish", () => {
        console.log(req.method, decodeURI(req.url), timeOf, res.statusCode, res.statusMessage)
    });
    next()
}

module.exports = {logger}