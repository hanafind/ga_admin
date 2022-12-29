const express = require('express');
const router = express.Router();

router.use('/', async (req, res, next) =>{
    next();
});

router.get('/', async (req, res, next) =>{  
    if(!req.session.is_login){
        res.redirect('/login');
    } else {
        res.redirect('/admin/dashboard');
    }
});

router.get('/login', async (req, res, next) =>{
    res.render('login',{});
});


router.get('/logout', async (req, res, next) => {
    req.session.destroy(function(err) {
        res.redirect('/login');
    })
});

module.exports = router;