const express = require('express');
const router = express.Router();

router.all('*', async (req, res, next) =>{
    if(!req.session.is_login){
        res.redirect('/login');
    } else {
        res.render('index', { req: req, res: res });
    }
});

module.exports = router;