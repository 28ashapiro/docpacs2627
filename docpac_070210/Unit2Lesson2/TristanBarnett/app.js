require('dotenv').config()
const PORT = Number(process.env.PORT);
const express = require('express')
const path = require('path')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/form.html'));
})

app.post("/form", (req, res) => {
    console.log(req.body);
    res.status(400).send({
        status: 400,
        message: "missing answers"
    })
    res.send();
})
app.listen(PORT, 'localhost', () =>{
    console.log(`server running at http://localhost:${PORT}/`);
});
