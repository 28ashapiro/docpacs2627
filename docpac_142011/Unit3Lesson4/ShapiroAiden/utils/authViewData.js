const userModel = require('../models/userModel');

function authViewData(req, res, next) {
    res.locals.currentUser = null;
    if (req.session.userId) {
        const user = userModel.findUserById(req.session.userId);
        if (user) {
            res.locals.currentUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                display_name: user.display_name
            };
        } else {
            delete req.session.userId;
        }
    }
    next();
}
module.exports = authViewData;