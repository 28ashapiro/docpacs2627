const express = require("express");
const path = require("path");

const router = express.Router()

console.log("route 1 hit")

const options = {
    root: path.join(__dirname)
}

router.get("/form",(req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'), (err) => {
        console.log(err)
    })
});

router.post("/form",(req,res) => { 
    data = req.body;

    username = data.username;
    password = data.password;

    if (
        !validate(username) ||
        !validate(password,0,16)
    ) {
        res.status(400)
        res.end("Input invalid. Ensure all fields have been filled in correctly before submitting.");
        return;
    };

    res.send(data);
});

router.get("/query",(req,res) => { 
    data = req.query;

    message = data.message;

    if (!message) {
        res.status(400)
        res.end("Input invalid. Ensure you have typed a message in before submitting.");
        return;
    };

    res.send(data);
})

function validate(input,minLength=0,maxLength=0) {
    if (!input || input == "") {
        return false;
    } else {
        if (minLength == 0 && maxLength == 0) {
            return true;
        } else {
            if (input.length >= minLength && input.length <= maxLength) {
                return true;
            };
        };
    };
}

module.exports = router;