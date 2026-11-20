const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const threadModel = require('../models/threadModel');

// PUBLIC USER PROFILE!!!!
userRouter.get('/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(404).render('error', {
            title: 'Not Found', status: 404,
            message: 'That user could not be found.'
        });
    }

    const user = userModel.findUserById(userId);

    if (!user) {
        return res.status(404).render('error', {
            title: 'Not Found', status: 404,
            message: 'That user could not be found.'
        });
    }

    const activity = threadModel.getUserActivity(userId);
    res.render('profile', { title: user.username, user, activity });
});

module.exports = userRouter;
