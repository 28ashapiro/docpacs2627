const express = require('express');
const path = require('path')
const url = require('url');
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/query', (req, res) => {
  //Query String
  const urlPart =  req.query;
  if (urlPart){
    if (urlPart.message){
      res.locals.title = "Query Response"
      res.locals.param = urlPart.message
      res.status(200).render(path.join(__dirname, '../views/queryResponse.ejs'));
    } else {
      res.locals.title = "Query Response Failed"
      res.locals.param = false
      res.status(400).render(path.join(__dirname, '../views/queryResponse.ejs'));
    }
  } else {
    res.status(400).send('No Content Available Without Message');
  }
});

router.get('/urlParams/:paramName', (req, res) => {
  //Dynamic URL segments
  const param = req.params.paramName
  if (param){
    res.locals.title = "Param Response"
    res.locals.param = param
    res.status(200).render(path.join(__dirname, '../views/parameterResponse.ejs'));
  } else {
    res.locals.title = "Param Response Failed"
    res.locals.param = false
    res.status(400).render(path.join(__dirname, '../views/parameterResponse.ejs'));
  }
});

module.exports = router;