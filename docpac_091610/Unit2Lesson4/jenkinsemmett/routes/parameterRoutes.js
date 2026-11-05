const express = require('express');
const url = require('url');
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/query', (req, res) => {
  //Query String
  const urlPart = url.parse(req.url, true);
  if (urlPart.search){
    if (urlPart.search.includes("?message=Hello")){
      res.status(200).send('Hi!');
    } else {
      res.status(400).send('No Content Available For This Message');
    }
  } else {
    res.status(400).send('No Content Available Without Message');
  }
});

router.get('/urlParams/:paramName', (req, res) => {
  //Dynamic URL segments
  const param = req.params.paramName
  if (param){
    res.status(200).send(`Welcome To The Parameter: ${param}`)
  } else {
    res.status(400).send('No Content Available Without Parameter');
  }
});

module.exports = router;