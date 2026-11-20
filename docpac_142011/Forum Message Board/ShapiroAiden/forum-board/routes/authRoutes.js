const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');

// REGISTER PAGE
 authRouter.get('/register', (req, res) => {
    res.render('register', { title: 'Register', message: '' });
});

// CREATE ACCOUNT
 authRouter.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (typeof username !== 'string' || username.trim() === '' ||
        typeof password !== 'string' || password.trim() === '') {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'Enter a username and password.'
        });
    }

    const cleanUsername = username.trim();

    if (password.length < 8) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'Password must be at least 8 characters.'
        });
    }

    if (userModel.findUserByUsername(cleanUsername)) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'That username is already taken.'
        });
    }

    try {
        userModel.createUser(cleanUsername, password);
        return res.redirect('/login');
    } catch (err) {
        console.error('REGISTER ERROR:', err);
        return res.status(500).render('register', {
            title: 'Register',
            message: 'Something went wrong while creating the account.'
        });
    }
});

// LOGIN PAGE
 authRouter.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: '' });
});

// LOG IN
 authRouter.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (typeof username !== 'string' || typeof password !== 'string' ||
        username.trim() === '' || password === '') {
        return res.status(400).render('login', {
            title: 'Login',
            message: 'Enter your username and password.'
        });
    }

    const user = userModel.findUserByUsername(username.trim());

    if (!user || !userModel.checkPassword(password, user.password_hash)) {
        return res.status(400).render('login', {
            title: 'Login',
            message: 'Username or password is incorrect.'
        });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/');
});

// LOG OUT
 authRouter.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('LOGOUT ERROR:', err);
            return res.status(500).render('error', {
                title: 'Error', status: 500,
                message: 'Could not log out. Please try again.'
            });
        }

        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

module.exports = authRouter;
