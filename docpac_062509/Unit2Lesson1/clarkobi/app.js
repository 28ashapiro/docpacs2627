const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const dotenv = require('dotenv');
dotenv.config()
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.post('/form',(req,res) => {
    const user = req.body.username
    if (!user || user.trim() === "") {
        res.status(400).send('Error text submitted is blank')
    } else{
        res.send(user)
    }
}) 

app.get('/form',(req,res) => {
    res.sendFile(path.join(__dirname,'public','form.html'))
});

app.listen(process.env.PORT, () => {
    console.log(process.env.APP)
    console.log(process.env.PORT)
    console.log('http://localhost:', process.env.PORT)
});