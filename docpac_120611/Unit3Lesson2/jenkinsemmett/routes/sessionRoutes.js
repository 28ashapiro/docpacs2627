const express = require('express');
const path = require('path')
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/session-test', (req, res) => {
  //Form or request body
  if (req.session.views) {
    req.session.views++;
  } else {
     req.session.views = 1;
  }
  res.locals.message = "Page Views: " + req.session.views
  res.locals.title = "Home Page"
  res.status(200).render(path.join(__dirname, '../views/sessionTEst.ejs'));
});

router.get('/session-test/reset', (req, res) => {
  if (req.session.views) {
    req.session.destroy()
  }
  res.redirect('/session-test')
});

module.exports = router;