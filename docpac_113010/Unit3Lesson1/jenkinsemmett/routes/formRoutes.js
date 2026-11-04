const express = require('express');
const path = require('path')
const querystring = require('querystring');
const accessDb = require('../models/entryModel.js')
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/form', (req, res) => {
  //Form or request body
  res.locals.title = "Form"
  res.status(200).render(path.join(__dirname, '../views/form.ejs'));
});

router.post('/form', (req, res) => {
  //Form or request body
  let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        accessDb.add('form', JSON.stringify(new Date), JSON.stringify(body));
        console.log(accessDb.getall());

        const query  = querystring.parse(body);
        //console.log(query);
        if (query.name.trim() && query.mail.trim() && query.size && query.projectChoice && query.techChoice && query.difficult && query.description.trim() && query.description.trim() != '--Place Description Here--' && query.contactChoice){
          res.locals.title = "Thank You!"
          res.locals.name = query.name.trim();
          res.status(200).render(path.join(__dirname, '../views/formResponse.ejs'));
        } else {
          res.locals.title = "Oops!"
          res.locals.name = false
          res.status(404).render(path.join(__dirname, '../views/formResponse.ejs'));
        }
    });
});

module.exports = router;