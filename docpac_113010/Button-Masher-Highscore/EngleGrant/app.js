const express = require("express");
const database = require("./models/entryModel");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/api/scores", (req,res) => {
    data = req.body;

    playerName = data.validatedName;
    score = data.validatedScore;

    console.log(data);

    if (playerName && score >= 0) {
        if (typeof score == "number" && typeof playerName == "string") {

            database.createEntry(playerName, score);
            res.send(JSON.stringify(data));
        }
    } else {
        res.status(400);
        res.send(JSON.stringify("Data invalid"));
    };
});

app.get("/api/scores", (req,res) => {
    res.send(database.getEntries(10))
});

app.use("", (req,res) => {
    res.status(404);
    res.end("Invalid");
})

app.listen(3000,"localhost", () => {
    console.log(`listening on port 3000`)
});