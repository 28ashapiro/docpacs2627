function take(req, res, next){

      date = new Date()
     method = req.method
     url = req.url
     statusCode = res.statusCode
     console.log(` date: ${date},  method: ${method}, url: ${url} status: ${statusCode}`)
     next()

}

module.exports = take