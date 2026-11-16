function requestLogger(req, res, next) {
    const isoTimestamp = new Date().toISOString();
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;
    res.on('finish', () => {
        const status = res.statusCode;
        console.log(' -', timestamp, '-', method, url, status, '- ');
    });
    if (url == '/form') {
        console.log(' - FORM - ');
    }
    if (url.includes('/query')) {
        console.log(' - QUERY - ');
    }
    if (url.includes('/urlparams')) {
        console.log(' - PARAMS - ');
    }
    if (url.includes('/entries')) {
        console.log(' - ENTRIES - ');
    }
    next();
}

module.exports = requestLogger;