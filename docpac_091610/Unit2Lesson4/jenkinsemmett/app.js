//Application Setup
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

//Middleware
app.use(express.static('public'));
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
  res.status(404).send('Error, Page Not Found!');
});