require('dotenv').config()
const PORT = Number(process.env.PORT);
const express = require('express')
const path = require('path')
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.get("/", (req, res) => {
})

app.get("/form", (req, res) => {
    res.sendFile(`form.html`);
})

app.listen(PORT, 'localhost', () =>{
    console.log(`server running at http://localhost:${PORT}/`);
});
