const session = require('express-session')

function sessionConfig(req, res, next) {
    const sessionMiddleware = req.session({
        secret: process.env.SECRET_MESSAGE,
        resave: false,
        saveUninitialized: false,
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
    module.exports = sessionConfig
};