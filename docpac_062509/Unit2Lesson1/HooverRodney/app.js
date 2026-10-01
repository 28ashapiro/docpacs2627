require('dotenv').config();
let express = require('express');

const app = express();
const port = process.env.PORT;
const appName = process.env.APP_NAME;

app.use(express.static('public'));

app.listen(port, () => {
    console.log("APP_NAME is " + appName);
    console.log("PORT is " + port);
    console.log("URL is localhost:" + port);
});