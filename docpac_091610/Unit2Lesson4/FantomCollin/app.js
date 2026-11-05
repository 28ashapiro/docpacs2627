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

// Imports route endpoints from separate files
// apart of the "controller" layer of MVC, as it handles controller logic.
app.use(require('./routes/formRoutes.js'));
app.use(require('./routes/pageRoutes.js'));
app.use(require('./routes/parameterRoutes.js'));

app.all(('/*splat'), (req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Error: Super Uh Oh!</title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <h1 class='element'>404 ERROR: PAGE NOT FOUND :/</h1>>
</body>

</html>`);
});

app.listen(port, () => {
    console.log(`${appName} is running at port ${port}`);
    console.log(`URL: http://localhost:${port}`);
});