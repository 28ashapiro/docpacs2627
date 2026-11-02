require('dotenv').config()
const PORT = Number(process.env.PORT);
const express = require('express')
const {logger} = require('./utils/requestLogger.js')
const path = require('path')
//contain controller logic
const {pageRoute} = require("./routes/pageRoutes.js")
const {formRoute} = require("./routes/formRoutes.js")
const {parameterRoute} = require("./routes/parameterRoutes.js")

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(logger);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(pageRoute);
app.use(formRoute);
app.use(parameterRoute);

app.all(`*path`, (req, res) => {
    res.status(404).render('error', {
        title: 'error',
        message: `can't find that on this server!`,
        code: res.statusCode,
        href: '/',
        navs: [{ 'href': '/', 'text': "home" },
               { "href": '/form', "text": 'form' }]
    })
})

app.listen(PORT, 'localhost', () =>{
    console.log(`server running at http://localhost:${PORT}/`);
});
