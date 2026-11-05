const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const { time } = require('console');
const requestLogger=require('./utils/requestLogger');
const routesForm=require('./routes/formRoutes');
const routesPage=require('./routes/pageRoutes');
const routesParam=require('./routes/parameterRoutes');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(requestLogger);
app.use(routesForm);
app.use(routesPage);
app.use(routesParam);

app.listen(process.env.PORT, () => {
    console.log(process.env.APP)
    console.log(process.env.PORT)
    console.log('http://localhost:', process.env.PORT)
});
