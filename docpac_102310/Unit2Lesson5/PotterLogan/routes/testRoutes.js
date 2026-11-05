express = require('express')

testRouter = express.Router()


testRouter.get('/query', (req, res) => {

    if (req.query.message) {
        res.render('query', {
            message: `your message was ${req.query.message}`
        })
    } else {
        res.render('error', {
            message: "error 400! your message was not sent properly! use the format: /query?message=hello!"
        })
    }
})

testRouter.get('/urlparams/:urlparam', (req, res) => {

    res.render('urlparams', {
        message: `your message was ${req.params.urlparam}`
    })

})




module.exports = testRouter