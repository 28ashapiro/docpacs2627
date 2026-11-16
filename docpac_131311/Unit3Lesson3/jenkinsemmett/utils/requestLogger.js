function logger(req, res, next){
    res.on('finish', ()=> {
        var currentdate = new Date();
        console.log(`[${currentdate.getFullYear()}-${currentdate.getMonth() + 1}-${currentdate.getDate()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}] ${req.method} ${req.url} ${res.statusCode}`);
    });
    next();
}

module.exports = logger;