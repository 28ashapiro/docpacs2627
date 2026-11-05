//Application Setup
const dotenv = require('dotenv').config();
const path = require('path')
const express = require('express');

const app = express();

const accessDb = require('./models/entryModel.js')
console.log(accessDb.getall());

//Middleware
app.use(express.static('public'));

//Defines EJS
app.set('view engine', 'ejs');

//Utility Function
app.use(require('./utils/requestLogger'))

//Route Handlers
var server = app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`);
});

//Direction To Routes Code
app.use(require('./routes/formRoutes'))
app.use(require('./routes/pageRoutes'))
app.use(require('./routes/parameterRoutes'))

app.use(function(req, res) {
  //When All Else Fails
  res.locals.title = 'Error!'
  res.status(404).render(path.join(__dirname, './views/error.ejs'));
});