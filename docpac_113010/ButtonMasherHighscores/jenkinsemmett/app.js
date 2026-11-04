//Start-up Express
const express = require('express');
const app = express();

app.use(express.static('public'));

//Change These Values To Change Server Location, Change Values In package.json As Well
var server = app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`); 
});

//Other Requirements
const path = require('path')

//Database Connection
const accessDb = require('./database.js')

//Routes
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/game', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public/game.html'))
});

app.get('/scores', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public/highscore.html'))
});

app.get('/api/scores', (req, res) => {
    let a = accessDb.getall()
    let b = []
    let c = false
    if (a.length > 0){
        for (i = 0; i < a.length; i++){
            c = true;
            if (b.length == 0){
                b.push(a[i])
            } else {
                for (o = 0; o < b.length; o++){
                    if (parseInt(a[i].score) >= parseInt(b[o].score)){
                        b.splice(o, 0, a[i]);
                        if (b.length == 11){
                            b.pop()
                        }
                        c = false;
                        break;
                    } 
                }
                if (b.length < 10 && c == true){
                    b.push(a[i])
                }
            }
        }for (o = 0; o < b.length; o++){
            b[o].rank = o + 1;
        }
    } else {
        b = false
    }
    res.status(200).send(b)
})

app.post('/api/scores', (req, res) => {
    console.log('score recieved');
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(body);
        const query = JSON.parse(body);
        if(query.name){
            if(Number.isInteger(query.score)){
                if(query.score > 0){
                    accessDb.add(query.name, query.score);
                    console.log(accessDb.getall());
                    res.status(200).send('Score Saved Successfully')        
                } else {
                    console.log('invalid score (negative)');
                }
            } else {
                console.log('invalid score (decimal/text)');
            } 
        } else {
            console.log('invalid name');
        }
    });
})

app.use(function(req, res) {
  res.status(404).send('404 Error! Page Not Found!')
});