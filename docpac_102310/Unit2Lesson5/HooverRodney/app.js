require('dotenv').config();
let express = require('express');
const path = require('path');
const logRequest = require('./utils/requestLogger.js');
const formRoutes = require('./routes/formRoutes.js');
const parameterRoutes = require('./routes/parameterRoutes.js');
const pageRoutes = require('./routes/pageRoutes.js');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT;
const appName = process.env.APP_NAME;

app.use(logRequest);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(pageRoutes);
app.use(formRoutes);
app.use(parameterRoutes);

app.use((req, res, next) => {
  const attemptedURL = req.url
  res.status(404).render('error.ejs', {
    pageTitle: "An Error Has Occurred!",
    statusCode: 404,
    errorHeading: "Error 404",
    message: "The requested page does not exist! Please enter a valid URL or ",
    linkText: "return to the homepage",
    linkURL: "/",
  })
});

app.listen(port, () => {
  console.log("APP_NAME is " + appName);
  console.log("PORT is " + port);
  console.log("URL is localhost:" + port);
});