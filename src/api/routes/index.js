const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
})

router.use('/blogs', require('./blogs'));
router.use('/auths', require('./auths'));

/*
router.get('/', async (req, res, next) =>{
  console.log(123123)
  if(req.session.is_login){

  } else {
      res.render(`login`, { title: '', req: req });  
  }
});
*/
module.exports = router;