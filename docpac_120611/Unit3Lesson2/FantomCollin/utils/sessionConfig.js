const session = require('express-session')

function sessionConfig(next) {
    session({
        secret: process.env.SECRET_MESSAGE,
        resave: false,
        saveUnititialized: false,
        cookie: function (req) {
             var match = req.url.match(/^\/([^/]+)/);
             return {
                path: match ? '/' + match[1] : '/',
                httpOnly: true,
                secure: req.secure || false,
                maxAge: 7200,
             }
        }
    });

    next();
};

module.exports = sessionConfig