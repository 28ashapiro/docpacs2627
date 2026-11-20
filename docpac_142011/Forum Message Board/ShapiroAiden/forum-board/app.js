const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

//util
const db = require('./database');
const threadModel = require('./models/threadModel');

//middleware
const { addCurrentUser } = require('./middleware/authMiddleware');

//controller / routes
const authRouter = require('./routes/authRoutes');
const threadRouter = require('./routes/threadRoutes');
const userRouter = require('./routes/userRoutes');

dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'change-this-secret-before-deploying',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.use(addCurrentUser);

app.use((req, res, next) => {
    res.locals.sidebarThreads = threadModel.getAllThreads();
    next();
});

// HOME PAGE
app.get('/', (req, res) => {
    const threads = require('./models/threadModel').getAllThreads();
    res.render('index', { title: 'Forum Board', threads });
    const timestamp = new Date().toLocaleString();
    console.log(' - INDEX -', timestamp, '-');
});

app.use('/', authRouter);
app.use('/threads', threadRouter);
app.use('/users', userRouter);

// 404 ERROR PAGE
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        status: 404,
        message: 'Page not found.'
    });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.error('APP ERROR:', err);
    res.status(500).render('error', {
        title: 'Server Error',
        status: 500,
        message: 'Something went wrong. Please try again.'
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`running here dude: http://localhost:${PORT}`);
});
