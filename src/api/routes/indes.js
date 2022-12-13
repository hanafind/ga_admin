var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
})

router.use('/blogs', require('./blogs'));

module.exports = router;