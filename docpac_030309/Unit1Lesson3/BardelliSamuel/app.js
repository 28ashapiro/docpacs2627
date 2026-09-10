require('dotenv').config()

const name = process.env.APP_NAME
const port = process.env.PORT

console.log('Current/new values: ','Port:',port,'App Name:', name)
console.log('new line added')