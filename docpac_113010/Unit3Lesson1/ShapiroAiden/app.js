//  require 
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

//app 
dotenv.config();

const app = express();

// not very sneaky port config
const PORT = process.env.PORT || 3000;

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// routes and util
const requestLogger = require('./utils/requestLogger');
const formRouter = require('./routes/formRoutes');
const pageRouter = require('./routes/pageRoutes');
const paramRouter = require('./routes/parameterRoutes');


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);


// controller logic
app.use(pageRouter);
app.use(formRouter);
app.use(paramRouter);


// 404 error!! !
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        status: 404,
        message: 'Page not found.'
    });
});

// start server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`running here dude: http://localhost:${PORT}`);
});
