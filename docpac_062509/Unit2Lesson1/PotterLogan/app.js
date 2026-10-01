require('dotenv').config()
fs = require('fs')
http = require('http')
url = require('url')
express = require('express')
app = express();
path = require('path')
const PORT = process.env.PORT

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log('Server started!')
})

