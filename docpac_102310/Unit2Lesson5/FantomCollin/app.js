// importing required env vars, middleware, and modules
require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const appName = process.env.APP_NAME;
const app = express();
const path = require('path');
const requestLogger = require('./utils/requestLogger.js');

app.use(requestLogger);

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Imports route endpoints from separate files
// apart of the "controller" layer of MVC, as it handles controller logic.
app.use(require('./routes/formRoutes.js'));
app.use(require('./routes/pageRoutes.js'));
app.use(require('./routes/parameterRoutes.js'));

app.all(('/*splat'), (req, res) => {
    res.status(404).render('error', { appName: process.env.APP_NAME, status: res.statusCode, statusInstr: 'PAGE NOT FOUND', currentPage: '' });
});

app.listen(port, () => {
    console.log(`${appName} is running at port ${port}`);
    console.log(`URL: http://localhost:${port}`);
});