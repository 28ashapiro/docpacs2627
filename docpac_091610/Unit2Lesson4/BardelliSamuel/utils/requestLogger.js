function capture(req, res, next) {
    let d = new Date()
    let method = req.method
    let url = req.url
    let code

    res.on('finish', () => {
        code = res.statusCode
        console.log(`
            {
            date: ${d},     method: ${method}
            url: ${url},    code: ${code}
            }
            `)
    })
    next()
}

module.exports = { capture }