require('dotenv').config();

const port = process.env.PORT;
const appName = process.env.APP_NAME
console.log("APP_NAME is " + appName);
console.log("PORT is " + port);