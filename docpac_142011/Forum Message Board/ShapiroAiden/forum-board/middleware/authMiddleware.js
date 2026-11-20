function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

function addCurrentUser(req, res, next) {
    res.locals.currentUser = null;

    if (req.session.userId) {
        res.locals.currentUser = {
            id: req.session.userId,
            username: req.session.username
        };
    }

    next();
};

module.exports = {requireLogin, addCurrentUser};
