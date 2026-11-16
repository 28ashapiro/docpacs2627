const express = require('express');
const path = require('path')
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/', (req, res) => {
  //Form or request body
  res.locals.title = "Home Page"
  res.locals.name = "Emmett's Website"
  res.locals.message = "This Website Was Modified To Utilize EJS For Unit 2 Lesson 5"
  res.status(200).render(path.join(__dirname, '../views/index.ejs'));
});

router.get('/projects', (req, res) => {
  //Form or request body
  res.locals.title = "Projects"
  res.locals.list = ["Emmett's Website", "Poggle Crush", "PokePucks", "Other Games"]
  res.locals.message = "This Website Was Modified To Utilize EJS For Unit 2 Lesson 5"
  res.status(200).render(path.join(__dirname, '../views/projects.ejs'));
});

module.exports = router;