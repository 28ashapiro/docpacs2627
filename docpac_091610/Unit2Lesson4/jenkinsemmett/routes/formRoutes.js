const express = require('express');
const path = require('path')
const querystring = require('querystring');
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/form', (req, res) => {
  //Form or request body
  res.status(200).sendFile(path.join(__dirname, '../public/form.html'));
});

router.post('/form', (req, res) => {
  //Form or request body
  let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const query  = querystring.parse(body);
        //console.log(query);
        if (query.name.trim() && query.mail.trim() && query.size && query.projectChoice && query.techChoice && query.difficult && query.description.trim() && query.description.trim() != '--Place Description Here--' && query.contactChoice){
          res.status(200).send(`Hello, ${query.name}`);
        } else {
          res.status(400).send('There Is Missing Required Data From The Form, All Areas Must Have At Least One Selection, And Text Boxes Cannot Be Blank');
        }
    });
});

module.exports = router;