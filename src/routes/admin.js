const express = require('express');
const router = express.Router();

router.all('*', async (req, res, next) =>{
    
    //if(req.url == '/'){
    //    req.url = 'dashboard/index'
    //}

    res.render('index', { title: '', req : req });
});

module.exports = router;