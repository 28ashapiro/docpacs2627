express = require('express')



pageRouter = express.Router()




pageRouter.get('/', (req, res) => {

    res.render('index', {
        title: 'Server home page',
        appName: 'the app',
        description: "an ejs app / web server",
        subtitle: "Subtitle!",
        links: [
            {"href" : "/form", "text" : "form"},
            {"href" : "/query?message=testmessage", "text" : "test query"}
        ]
    })

})



pageRouter.get('/form', (req, res) => {

    res.render('form')

})

pageRouter.post('/form', (req, res) => {

    body = req.body
    console.log(body.email)
    if (body) {
        res.send(body)
    }
    else {
        res.status(400).send("error missing input!")
    }

})

pageRouter.post('/formResponse', (req, res) => {

    if (req.body) {
        res.render('formResponse', {
            name: `Your name is ${req.body.name}`
        })
    } else {
        res.status(400).send("error missing input!")
    }

})

module.exports = pageRouter