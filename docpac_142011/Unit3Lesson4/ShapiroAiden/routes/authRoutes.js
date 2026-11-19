const express = require('express');
const userModel = require('../models/userModel');

const authRouter = express.Router();

// register
authRouter.get('/register', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/account');
    }
    res.render('register', {
        title: 'Register',
        message: 'Register your account.'
    });
});

authRouter.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    const display_name = req.body.display_name;
    // check required fields
    if (!username || !email || !password || !repeatPassword) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'Please fill out every required field.'
        });
    }
    // clean submitted information
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanDisplayName = display_name ? display_name.trim() : '';
    // validate lengths
    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'Username must be between 3 and 30 characters.'
        });
    }
    if (cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'Please enter a valid email address.'
        });
    }
    if (password.length < 8) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'Password must be at least 8 characters long.'
        });
    }
    // check passwords
    if (password !== repeatPassword) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'Passwords do not match.'
        });
    }
    // check duplicate username
    if (userModel.findUserByUsername(cleanUsername)) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'That username is already taken.'
        });
    }
    // check duplicate email
    if (userModel.findUserByEmail(cleanEmail)) {
        return res.status(400).render('register', {
            title: 'Register',
            message: 'That email address is already registered.'
        });
    }
    try {
        // create user
        const newUserId = userModel.createUser(cleanUsername, cleanEmail, password, cleanDisplayName);
        // automatically log in the new user
        req.session.userId = newUserId;
        req.session.save((err) => {
            if (err) {
                return res.status(500).render('error', {
                    title: 'Registration Error',
                    status: 500,
                    message: 'Your account was created, but login could not be completed.'
                });
            }
            console.log('Registered as:', cleanDisplayName || cleanUsername);
            res.redirect('/account');
        });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(400).render('register', {
                title: 'Register',
                message: 'That username or email address is already registered.'
            });
        }
        console.log(err);
        return res.status(500).render('error', {
            title: 'Registration Error',
            status: 500,
            message: 'Something went wrong while creating your account.'
        });
    }

});

// login
authRouter.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/account');
    }
    res.render('login', {
        title: 'Login',
        message: 'Login to your account.'
    });
});

authRouter.post('/login', (req, res) => {
    const identifier = req.body.identifier;
    const password = req.body.password;

    // validate fields
    if (!identifier || !password) {
        return res.status(400).render('login', {
            title: 'Login',
            message: 'Please enter your username or email and password.'
        });
    }
    const cleanIdentifier = identifier.trim();

    // find user by username or email
    let user = userModel.findUserByUsername(cleanIdentifier);
    if (!user) {
        user = userModel.findUserByEmail(cleanIdentifier.toLowerCase());
    }

    // check account
    if (!user) {
        return res.status(401).render('login', {
            title: 'Login',
            message: 'Incorrect username, email, or password.'
        });
    }

    // check password
    if (user.password !== password) {
        return res.status(401).render('login', {
            title: 'Login',
            message: 'Incorrect username, email, or password.'
        });
    }

    // store user ID in session
    req.session.userId = user.id;
    req.session.save((err) => {
        if (err) {
            return res.status(500).render('error', {
                title: 'Login Error',
                status: 500,
                message: 'Unable to complete login.'
            });
        }
        console.log('Logged in as:', user.display_name || user.username);
        res.redirect('/account');
    });
});

// account
authRouter.get('/account', (req, res) => {
    // check login
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    // retrieve user
    const user = userModel.findUserById(req.session.userId);
    if (!user) {
        return req.session.destroy(() => {
            res.redirect('/login');
        });
    }
    res.render('account', {
        title: 'Account',
        user: user
    });
});


// logout
authRouter.post('/logout', (req, res) => {
    const user = req.session.userId ? userModel.findUserById(req.session.userId) : null;
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).render('error', {
                title: 'Logout Error',
                status: 500,
                message: 'Unable to log out.'
            });
        }
        if (user) {
            console.log('Logged out of:', user.display_name || user.username);
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

module.exports = authRouter;