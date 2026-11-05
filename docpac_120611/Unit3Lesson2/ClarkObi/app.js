const PORT = Number(process.env.PORT) || 3000;
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
const session=require('./utils/sessionConfig')
const { time } = require('console');
const requestLogger=require('./utils/requestLogger');
const routesForm=require('./routes/formRoutes');
const routesPage=require('./routes/pageRoutes');
const routesParam=require('./routes/parameterRoutes');
const routesSession=require('./routes/sessionRoutes')
const app = express();
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(requestLogger);
app.use(session);
app.use(routesForm);
app.use(routesPage);
app.use(routesParam);
app.use(routesSession);

app.listen(PORT, () => {
    console.log(process.env.APP)
    console.log('http://localhost:',PORT)
}).on('error',(err)=>{console.error('Sever failed to start',err.message)});
