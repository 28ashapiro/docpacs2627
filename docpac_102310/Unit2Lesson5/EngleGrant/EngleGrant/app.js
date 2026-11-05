const express = require("express");
// const path = require("path");
const env = require("dotenv").config();

const requestLogger = require("./utils/requestLogger.js");
const formRoutes = require("./routes/formRoutes.js");
const pageRoutes = require("./routes/pageRoutes.js");
const parameterRoutes = require("./routes/parameterRoutes.js");

const app = express();

const PORT = process.env.PORT;

app.set('view engine', "ejs")
// app.set('views', path.join(__dirname, "views")) - the default location, no need to declare it again

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger)
app.use(formRoutes)
app.use(pageRoutes)
app.use(parameterRoutes)

app.use("",(req,res) => {
    res.status(404)
    res.render('error',{pageTitle: "Error", error: "No resource found."})
});

app.listen(PORT,"localhost", () => {
    console.log(`listening on port ${PORT}`)
});