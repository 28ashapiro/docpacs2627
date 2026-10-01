require('dotenv').config()
const PORT = Number(process.env.PORT);
const {parse} = require('querystring');
const express = require('express')
const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile('index.html');
})

app.get("/form", (req, res) => {
    res.sendFile('form.html');
})

app.listen(PORT, 'localhost', () =>{
    console.log(`server running at http://localhost:${PORT}/`);
});
