require('dotenv').config()
const PORT = Number(process.env.PORT);
const express = require('express')
const {logger} = require('./utils/requestLogger.js')

//contain controller logic
const {pageRoute} = require("./routes/pageRoutes.js")
const {formRoute} = require("./routes/formRoutes.js")
const {parameterRoute} = require("./routes/parameterRoutes.js")


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(logger);


app.use(pageRoute);
app.use(formRoute);
app.use(parameterRoute);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `can't find ${req.originalUrl} on this server!`
    });
    next()
});

app.listen(PORT, 'localhost', () =>{
    console.log(`server running at http://localhost:${PORT}/`);
});
