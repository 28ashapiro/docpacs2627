const express = require('express');
const path = require('path')
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/', (req, res) => {
  //Form or request body
  res.status(200).sendFile(path.join(__dirname, '../public/home.html'));
});

module.exports = router;