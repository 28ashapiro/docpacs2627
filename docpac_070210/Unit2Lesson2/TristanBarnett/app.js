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
    if (req.body == '') {
        res.status(400).send({
            status: 400,
            message: "missing answers"
        })
    }
    res.send();
})

app.get("/query", (req, res) => {
    if (req.query.message != '') {
        console.log(req.query.message);
        res.send(req.query.message)
    }
    if (req.query.message == '') {
        res.status(400).send("no word after message query")
    }
})

app.get(`/urlparams/:isgreg`, (req, res) => {
    const isgreg = req.params.isgreg;
    if (isgreg == '') {
        res.status(400).send('param empty')
    }

    if (isgreg != "greg") {
        if (isgreg != "Greg") {
            res.send("it's a "+ isgreg +' not a greg')
        }
    }

    if (isgreg == "greg" || "Greg") {
        res.send("it's a "+ isgreg)
    }
})

app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `can't find ${req.originalUrl} on this server!`
    });
});

app.listen(PORT, 'localhost', () =>{
    console.log(`server running at http://localhost:${PORT}/`);
});
