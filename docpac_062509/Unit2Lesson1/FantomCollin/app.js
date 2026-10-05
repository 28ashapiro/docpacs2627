require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const appName = process.env.APP_NAME;
const app = express()

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`${appName} is running at port ${port}`)
    console.log(`URL: http://localhost:${port}`)
});