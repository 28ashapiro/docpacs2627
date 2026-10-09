// app.use((req, res, next) => {
//     console.log('----------------------------------------');
//     console.log('request received:', req.method, req.url);
//     console.log('at:', new Date().toLocaleString());
//     next();
// });

function requestLogger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;
    res.on('finish', () => { 
            const status = res.statusCode; 
            console.log('|', timestamp, '|', method, url, status); });
    next();
}

module.exports = requestLogger;