const express = require('express');
const router = express.Router();

router.use('/', async (req, res, next) =>{
    next();
    //res.render('login',{})
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