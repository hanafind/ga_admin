const express = require('express');
const router = express.Router();

router.all('*', async (req, res, next) =>{
  
    req.url = req.url.substring(1, req.url.length)
    console.log(req.url)
    if(!req.url){
        req.url = 'dashboard';
    }
    
    res.render(`index`, { title: '', req : req });
});

module.exports = router;